"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = void 0;
const logoutController = async (req, res, next) => {
    try {
        res.cookie("refreshToken", "0", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0),
            sameSite: "strict",
            path: "/",
        });
        return res.status(200).json({ message: "Log-out Successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.logoutController = logoutController;
