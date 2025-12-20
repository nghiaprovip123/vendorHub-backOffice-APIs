# =========================
# Stage 1: Base
# =========================
FROM node:20-alpine AS base
WORKDIR /app
# Install openssl for Prisma to work on Alpine
RUN apk add --no-cache openssl

# =========================
# Stage 2: Dependencies (Development)
# =========================
FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
# Install ALL dependencies including devDependencies for the build
RUN npm ci
# Generate Prisma Client (required for TS compilation)
RUN npx prisma generate

# =========================
# Stage 3: Builder (Compilation)
# =========================
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Compile TypeScript to JavaScript (usually outputs to /dist)
RUN npm run build
# Prune devDependencies to keep the production image small
RUN npm prune --production

# =========================
# Stage 4: Runtime (Production)
# =========================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Security: non-root user
RUN addgroup -g 1001 nodejs && \
    adduser -D -G nodejs -u 1001 expressjs
USER expressjs

# Copy only the necessary files for execution
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# Prisma needs the schema file in some MongoDB configurations
COPY --from=builder /app/prisma ./prisma 

EXPOSE 8080

# Start the Express server
CMD ["node", "dist/app.js"]
