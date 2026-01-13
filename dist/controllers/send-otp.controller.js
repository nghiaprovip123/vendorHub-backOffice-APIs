"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOTPController = void 0;
const postgresql_1 = __importDefault(require("../lib/postgresql"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const crypto_1 = __importDefault(require("crypto"));
const send_otp_helper_1 = require("../lib/send-otp-helper");
const SendOTPController = async (req, res, next) => {
    try {
        const { phone, type, email } = req.body;
        if (!email || !phone) {
            throw new ApiError_1.default(400, 'Phone is required');
        }
        const [{ count }] = await (0, postgresql_1.default) `
          SELECT COUNT(*)::int AS count
          FROM otps
          WHERE type = ${type}
            AND email = ${email}
            AND phone = ${phone}
            AND createdat > NOW() - INTERVAL '15 minutes'
        `;
        if (count >= 3) {
            throw new ApiError_1.default(429, 'OTP rate limit exceeded');
        }
        await (0, postgresql_1.default) `
          UPDATE otps
          SET isverified = true,
              isactive = false
          WHERE type = ${type}
            AND email = ${email}
            AND phone = ${phone}
            AND isverified = false
            AND isactive = true
        `;
        const otp = crypto_1.default.randomInt(100000, 999999).toString();
        // const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
        const [{ expiresat }] = await (0, postgresql_1.default) `
          INSERT INTO otps (type, email, otp, expiresat, phone)
          VALUES (${type}, ${email}, ${otp}, NOW() + INTERVAL '5 minutes', ${phone})
          RETURNING expiresat
        `;
        const sendOTP = await (0, postgresql_1.default) `
            SELECT * FROM otps
            WHERE email = ${email}
                AND isactive = 'true'
                AND isverified = 'false'
        `;
        await (0, send_otp_helper_1.sendOtpEmailRegisteration)(email, otp);
        res.json({
            success: true,
            otp: sendOTP,
            expiresAt: expiresat,
            remainingAttempts: 3 - count
        });
    }
    catch (err) {
        next(err);
    }
};
exports.SendOTPController = SendOTPController;
