"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOTPController = void 0;
const send_otp_service_1 = require("../services/auth/send-otp.service");
const SendOTPController = async (req, res, next) => {
    try {
        const { phone, type, email } = req.body;
        const result = await (0, send_otp_service_1.SendOTPService)({ phone, type, email });
        return res.json({
            success: true,
            otp: result.otp,
            expiresAt: result.expiresAt,
            remaining: result.remainingAttempts
        });
    }
    catch (err) {
        next(err);
    }
};
exports.SendOTPController = SendOTPController;
