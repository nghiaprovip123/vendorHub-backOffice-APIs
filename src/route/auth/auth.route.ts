import { Router } from 'express'
import { authSchema } from '@/validation/auth/auth.validation'
import { registerController } from '@/controller/auth/register.controller';
import { loginController } from '@/controller/auth/login.controller';
import { refreshTokenController } from '@/controller/auth/refreshToken.controller'
import { logoutController } from '@/controller/auth/logout.controller'
<<<<<<< HEAD
import { googleRedirectController } from '@/controller/auth/googleRedirect.controller'
=======
>>>>>>> d4cf2bcc4b5d6fda7fb1ea774f277a433ee9da95
import { validate } from '@/middlewares/validate.middleware';
import { googleAuthController } from '@/controller/auth/callback/google/googleAuth.controller'
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
<<<<<<< HEAD
router.post(
    "/logout",
    logoutController
);

// ============================================
// auth/google
// ============================================
router.get(
    "/google",
    googleRedirectController
)

// ============================================
// auth/callback/google
// ============================================
router.get(
    "/callback/google",
    googleAuthController
=======
router.get(
    "/logout",
    logoutController
>>>>>>> d4cf2bcc4b5d6fda7fb1ea774f277a433ee9da95
)

export default router;

