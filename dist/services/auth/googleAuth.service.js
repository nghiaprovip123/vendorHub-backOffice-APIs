"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = void 0;
const prisma_1 = require("../../lib/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const googleAuth = async ({ code }) => {
    if (!code) {
        throw new Error("Authorization code not found");
    }
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code",
        }),
    });
    const tokenData = (await tokenResponse.json());
    if (!tokenData.access_token) {
        throw new Error("Failed to fetch Google access token");
    }
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
        },
    });
    const userInfo = await (userRes.json());
    if (!userInfo.email) {
        throw new Error("Failed to fetch Google access token");
    }
    let user = await prisma_1.prisma.user.findUnique({
        where: { email: userInfo.email },
    });
    if (!user) {
        user = await prisma_1.prisma.user.create({
            data: {
                email: userInfo.email,
                name: userInfo.userName ?? "",
                password: "", // OAuth user → no password
            },
        });
    }
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    await prisma_1.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });
    return { accessToken, refreshToken };
};
exports.googleAuth = googleAuth;
