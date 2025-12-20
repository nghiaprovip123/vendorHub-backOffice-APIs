"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionOptions = void 0;
exports.sessionOptions = {
    password: process.env.SESSION_SECRET,
    cookieName: 'cart_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
    },
};
