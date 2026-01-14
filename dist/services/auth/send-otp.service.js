"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOTPService = void 0;
const postgresql_1 = __importDefault(require("../../lib/postgresql"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const crypto_1 = __importDefault(require("crypto"));
const send_otp_helper_1 = require("../../lib/send-otp-helper");
const SendOTPService = async ({ phone, type, email }) => {
    if (!email || !phone) {
        throw new ApiError_1.default(400, 'Email is required');
    }
    const [{ count }] = await (0, postgresql_1.default) `
        SELECT COUNT(*)::int AS count 
        FROM otps
        WHERE type = ${type}
            AND email = ${email}
            AND createdat > NOW() - INTERVAL '15 minutes'
    `;
    if (count > 3) {
        throw new ApiError_1.default(429, "KHÔNG THỂ GỬI OTP VÌ SỐ LẦN GỬI OTP ĐÃ ĐẠT GIỚI HẠN");
    }
    await (0, postgresql_1.default) `
        UPDATE otps
        SET isverified = true
            AND isactive = false
        WHERE type = ${type}
            AND email = ${email}
            AND phone = ${phone}
            AND isverified = false
            AND isactive = true
    `;
    const generateOTP = await crypto_1.default.randomInt(100000, 999999).toString();
    const [{ expiresat }] = await (0, postgresql_1.default) `
        INSERT INTO otps (
            type, 
            email,
            otp,
            expiresat,
            phone
        ) VALUES (
            ${type},
            ${email},
            ${generateOTP},
            NOW() + INTERVAL '15 Minutes',
            ${phone}
        )
        RETURNING expiresAt
    `;
    const [sendOTP] = await (0, postgresql_1.default) `
        SELECT *
        FROM otps
        WHERE email = ${email}
        AND isactive = true
        AND isverified = false
    `;
    await (0, send_otp_helper_1.sendOtpEmailRegisteration)(email, generateOTP);
    return {
        otp: sendOTP,
        expiresAt: expiresat,
        remainingAttempts: 3 - count
    };
};
exports.SendOTPService = SendOTPService;
