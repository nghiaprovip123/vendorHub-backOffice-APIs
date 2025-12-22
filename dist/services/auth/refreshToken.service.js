"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const prisma_1 = require("../../lib/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshToken = async ({ refreshToken }) => {
    if (!refreshToken) {
        throw new Error("Unthorization - No refreshToken");
    }
    const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw new Error("User doesn't exist");
    }
    if (user.refreshToken !== refreshToken) {
        throw new Error("Token mismatch");
    }
    const accessToken = await jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
    return { accessToken };
};
exports.refreshToken = refreshToken;
