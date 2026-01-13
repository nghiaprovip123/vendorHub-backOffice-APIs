"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmailRegisteration = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const sendOtpEmailRegisteration = async (to, otp) => {
    await exports.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: "[vendorHub] OTP Đăng ký",
        text: `OTP của bạn là: ${otp}. Có hiệu lực trong vòng 5 phút.`,
        html: `
      <p>OTP của bạn là:</p>
      <h2>${otp}</h2>
      <p>Có hiệu lực trong vòng 5 phút.</p>
    `,
    });
};
exports.sendOtpEmailRegisteration = sendOtpEmailRegisteration;
