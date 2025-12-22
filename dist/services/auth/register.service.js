"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../lib/prisma");
const register = async ({ email, password, userName }) => {
    const checkUser = await prisma_1.prisma.user.findUnique({
        where: { email }
    });
    if (checkUser) {
        throw new Error("User already exists");
    }
    ;
    const hashPassword = await bcryptjs_1.default.hash(password, 10);
    const createUser = await prisma_1.prisma.user.create({
        data: {
            email,
            userName: userName ?? email,
            password: hashPassword,
        }
    });
    return createUser;
};
exports.register = register;
exports.default = exports.register;
