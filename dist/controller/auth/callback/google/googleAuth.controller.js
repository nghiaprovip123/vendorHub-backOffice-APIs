"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthController = void 0;
const googleAuth_service_1 = require("../../../../services/auth/googleAuth.service");
const googleAuthController = async (req, res, next) => {
    try {
        const code = req.query.code;
        const responseController = await (0, googleAuth_service_1.googleAuth)({ code });
        const refreshToken = await responseController;
        res.cookie("refreshToken", refreshToken, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });
        res.status(201).json({ message: "Login by Google Successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.googleAuthController = googleAuthController;
