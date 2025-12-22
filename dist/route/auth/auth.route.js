"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validation_1 = require("../../validation/auth/auth.validation");
const register_controller_1 = require("../../controller/auth/register.controller");
const login_controller_1 = require("../../controller/auth/login.controller");
const refreshToken_controller_1 = require("../../controller/auth/refreshToken.controller");
const logout_controller_1 = require("../../controller/auth/logout.controller");
const googleRedirect_controller_1 = require("../../controller/auth/googleRedirect.controller");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const googleAuth_controller_1 = require("../../controller/auth/callback/google/googleAuth.controller");
const router = (0, express_1.Router)();
// ============================================
// auth/register
// ============================================
router.post("/register", (0, validate_middleware_1.validate)(auth_validation_1.authSchema.register), register_controller_1.registerController);
// ============================================
// auth/login
// ============================================
router.post("/login", (0, validate_middleware_1.validate)(auth_validation_1.authSchema.register), login_controller_1.loginController);
// ============================================
// auth/refresh-token
// ============================================
router.post("/refresh-token", refreshToken_controller_1.refreshTokenController);
// ============================================
// auth/logout
// ============================================
router.post("/logout", logout_controller_1.logoutController);
// ============================================
// auth/google
// ============================================
router.get("/google", googleRedirect_controller_1.googleRedirectController);
// ============================================
// auth/callback/google
// ============================================
router.get("/callback/google", googleAuth_controller_1.googleAuthController);
exports.default = router;
