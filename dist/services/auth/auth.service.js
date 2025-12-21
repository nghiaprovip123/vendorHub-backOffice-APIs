"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_codes_1 = require("http-status-codes");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../../models/user.model");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authService = {
    register: async ({ email, password, userName }) => {
        const existingUser = await user_model_1.UserModel.findByEmail(email);
        if (existingUser) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Email already registered");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await user_model_1.UserModel.create({
            email,
            password: hashedPassword,
            userName: userName ?? email
        });
        return { message: "Account created successfully" };
    },
    login: async ({ email, password }) => {
        const existingUser = await user_model_1.UserModel.findByEmail(email);
        if (!existingUser) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "USER_NOT_FOUND");
        }
        const match = await bcryptjs_1.default.compare(password, existingUser.password);
        if (!match) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Wrong password");
        }
        const accessToken = await jsonwebtoken_1.default.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = await jsonwebtoken_1.default.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return { accessToken, refreshToken };
    },
    refreshToken: async (token) => {
        if (!token)
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized - No token");
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
        }
    }
};
