import { Request, Response, NextFunction } from "express"
import sql from "@/lib/postgresql"
import ApiError from "@/utils/ApiError"
import crypto from "crypto"
import { sendOtpEmailRegisteration } from "@/lib/send-otp-helper"
type SendOTPControllerType = {
    phone: string,
    type: string
}
export const SendOTPController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, type, email } = req.body
  
        if (!email || !phone) {
          throw new ApiError(400, 'Phone is required')
        }
      
        const [{ count }] = await sql`
          SELECT COUNT(*)::int AS count
          FROM otps
          WHERE type = ${type}
            AND email = ${email}
            AND phone = ${phone}
            AND createdat > NOW() - INTERVAL '15 minutes'
        `
      
        if (count >= 3) {
          throw new ApiError(429, 'OTP rate limit exceeded')
        }
      
        await sql`
          UPDATE otps
          SET isverified = true,
              isactive = false
          WHERE type = ${type}
            AND email = ${email}
            AND phone = ${phone}
            AND isverified = false
            AND isactive = true
        `
      
        const otp = crypto.randomInt(100000, 999999).toString()
        // const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
      
        const [{ expiresat }] = await sql`
          INSERT INTO otps (type, email, otp, expiresat, phone)
          VALUES (${type}, ${email}, ${otp}, NOW() + INTERVAL '5 minutes', ${phone})
          RETURNING expiresat
        `
        const sendOTP = await sql `
            SELECT * FROM otps
            WHERE email = ${email}
                AND isactive = 'true'
                AND isverified = 'false'
        `
        await sendOtpEmailRegisteration(email, otp);

        res.json({
          success: true,
          otp: sendOTP,
          expiresAt: expiresat,
          remainingAttempts: 3 - count
        })
    }
    catch(err){
        next(err)
    }
  }
  