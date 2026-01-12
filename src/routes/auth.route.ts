import express from "express"
import { LoginController } from "@/controllers/login.controller"
import { SendOTPController } from "@/controllers/send-otp.controller"

const AuthRouter = express.Router()

AuthRouter.post('/login', LoginController)
AuthRouter.post('/sendOTP', SendOTPController)

export default AuthRouter
