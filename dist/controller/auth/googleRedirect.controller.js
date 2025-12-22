"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleRedirectController = void 0;
const googleRedirectController = async (req, res) => {
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleAuthUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID);
    googleAuthUrl.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI);
    googleAuthUrl.searchParams.set("response_type", "code");
    googleAuthUrl.searchParams.set("scope", "openid email profile");
    googleAuthUrl.searchParams.set("access_type", "offline");
    googleAuthUrl.searchParams.set("prompt", "consent");
    // Redirect the user to the Google authorization URL
    res.redirect(googleAuthUrl.toString());
};
exports.googleRedirectController = googleRedirectController;
