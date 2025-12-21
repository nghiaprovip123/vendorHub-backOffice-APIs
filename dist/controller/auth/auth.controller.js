"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("../../services/auth/auth.service");
const register = async (req, res, next) => {
    try {
        const result = await auth_service_1.authService.register(req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
    }
    catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = await auth_service_1.authService.login(req.body);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            path: "auth/refresh-token"
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({
            accessToken,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.authController = { register, login };
