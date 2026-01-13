import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOtpEmailRegisteration = async (to: string, otp: string) => {
  await transporter.sendMail({
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
