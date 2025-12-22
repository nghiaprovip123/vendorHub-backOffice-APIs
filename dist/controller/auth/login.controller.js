"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const login_service_1 = require("../../services/auth/login.service");
const loginController = async (req, res, next) => {
    try {
        const body = await req.body;
        const controllerResponse = await (0, login_service_1.login)(body);
        const { refreshToken, accessToken } = await controllerResponse;
        res.cookie("refreshToken", refreshToken, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });
        res.status(201).json({ message: "Login successfully", accessToken: accessToken });
    }
    catch (error) {
        next(error);
    }
};
exports.loginController = loginController;
