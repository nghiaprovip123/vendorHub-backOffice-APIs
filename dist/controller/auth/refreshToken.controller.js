"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const refreshToken_service_1 = require("../../services/auth/refreshToken.service");
const refreshTokenController = async (req, res, next) => {
    try {
        const getRefreshTokenFromCookie = await req.cookies.refreshToken;
        const responseController = await (0, refreshToken_service_1.refreshToken)({
            refreshToken: getRefreshTokenFromCookie,
        });
        const { accessToken } = await responseController;
        return res.status(200).json({ message: "Refresh Sucessfully Access Token", accessToken });
    }
    catch (error) {
        next(error);
    }
};
exports.refreshTokenController = refreshTokenController;
