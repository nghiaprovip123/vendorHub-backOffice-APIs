
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache openssl


FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate


FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=development
ENV PORT=8080

RUN apk add --no-cache openssl

RUN addgroup -g 1001 nodejs && \
    adduser -D -G nodejs -u 1001 expressjs

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

COPY --from=builder /app/prisma ./prisma

RUN npm ci --omit=dev

RUN npx prisma generate

COPY --from=builder /app/dist ./dist

COPY --from=deps /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=deps /app/node_modules/@prisma ./node_modules/@prisma

USER expressjs

EXPOSE 8080

CMD ["node", "dist/app.js"]