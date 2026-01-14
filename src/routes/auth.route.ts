import express from "express"
import { LoginController } from "@/controllers/login.controller"
import { SendOTPController } from "@/controllers/send-otp.controller"
import { VerifyOTPController } from "@/controllers/verify-otp.controller"

const AuthRouter = express.Router()

AuthRouter.post('/login', LoginController)
AuthRouter.post('/sendOTP', SendOTPController)
AuthRouter.post('/verifyOTP', VerifyOTPController)

export default AuthRouter
