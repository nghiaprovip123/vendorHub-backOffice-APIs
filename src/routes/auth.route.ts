import express from "express"
import { LoginController } from "@/controllers/auth/login.controller"
import { SendOTPController } from "@/controllers/auth/send-otp.controller"
import { VerifyOTPController } from "@/controllers/auth/verify-otp.controller"
import { CreatePasswordController } from "@/controllers/auth/create-password.controller"
const AuthRouter = express.Router()

AuthRouter.post('/login', LoginController)
AuthRouter.post('/sendOTP', SendOTPController)
AuthRouter.post('/verifyOTP', VerifyOTPController)
AuthRouter.post('/createPassword', CreatePasswordController)

export default AuthRouter
