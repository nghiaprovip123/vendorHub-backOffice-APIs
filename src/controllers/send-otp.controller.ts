import { Request, Response, NextFunction } from "express"
import sql from "@/lib/postgreSQL"
import ApiError from "@/utils/ApiError"
import crypto from "crypto"

type SendOTPControllerType = {
    phone: string,
    type: string
}
export const SendOTPController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, type } = req.body
  
        if (!phone) {
          throw new ApiError(400, 'Phone is required')
        }
      
        const [{ count }] = await sql`
          SELECT COUNT(*)::int AS count
          FROM otps
          WHERE type = ${type}
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
            AND phone = ${phone}
            AND isverified = false
            AND isactive = true
        `
      
        const otp = crypto.randomInt(100000, 999999).toString()
        // const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
      
        const [{ expiresat }] = await sql`
          INSERT INTO otps (type, phone, otp, expiresat)
          VALUES (${type}, ${phone}, ${otp}, NOW() + INTERVAL '5 minutes')
          RETURNING expiresat
        `
        const sendOTP = await sql `
            SELECT * FROM otps
            WHERE phone = ${phone}
                AND isactive = 'true'
                AND isverified = 'false'
        `
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
  