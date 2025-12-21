import { Router } from 'express'
import { authSchema } from '@/validation/auth/auth.validation'
import { registerController } from '@/controller/auth/register.controller';
import { loginController } from '@/controller/auth/login.controller';

import { validate } from '@/middlewares/validate.middleware';
const router = Router();

router.post(
    "/register",
    validate(authSchema.register),
    registerController
);

router.post(
    "/login",
    validate(authSchema.register),
    loginController
)
export default router;

