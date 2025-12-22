"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const prisma_1 = require("../../lib/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = async ({ email, password }) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw new Error("This email doens't exist in the system");
    }
    const loginPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!loginPassword) {
        throw new Error("Sorry, wrong password!");
    }
    const accessToken = await jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = await jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    await prisma_1.prisma.user.update({
        where: { email },
        data: { refreshToken }
    });
    return { accessToken, refreshToken };
};
exports.login = login;
