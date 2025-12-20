"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const prisma_1 = require("@/lib/prisma");
exports.UserModel = {
    findByEmail: (email) => {
        return prisma_1.prisma.user.findUnique({
            where: { email }
        });
    },
    create: (data) => {
        return prisma_1.prisma.user.create({ data });
    }
};
