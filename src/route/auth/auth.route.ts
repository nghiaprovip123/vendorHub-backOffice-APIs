import { Router } from 'express'
import { authSchema } from '@/validation/auth/auth.validation'
import { registerController } from '@/controller/auth/register.controller';
import { loginController } from '@/controller/auth/login.controller';
import { refreshTokenController } from '@/controller/auth/refreshToken.controller'
import { logoutController } from '@/controller/auth/logout.controller'
import { validate } from '@/middlewares/validate.middleware';
const router = Router();

// ============================================
// auth/register
// ============================================
router.post(
    "/register",
    validate(authSchema.register),
    registerController
);

// ============================================
// auth/login
// ============================================
router.post(
    "/login",
    validate(authSchema.register),
    loginController
);

// ============================================
// auth/refresh-token
// ============================================
router.post(
    "/refresh-token",
    refreshTokenController
);

// ============================================
// auth/logout
// ============================================
router.get(
    "/logout",
    logoutController
)

export default router;

