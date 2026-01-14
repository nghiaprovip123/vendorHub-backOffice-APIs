import { Request, Response, NextFunction } from "express"
import sql from "@/lib/postgresql"
import ApiError from "@/utils/ApiError"
import jwt from "jsonwebtoken"
import crypto from "crypto"

export const VerifyOTPController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { otp, email, name } = req.body
  
      const [otpRow] = await sql`
        SELECT id FROM otps
        WHERE otp = ${otp}
          AND email = ${email}
          AND isverified = false
          AND isactive = true
          AND expiresat > NOW()
      `
  
      if (!otpRow) {
        throw new ApiError(400, "OTP is invalid")
      }
  
      const [existing] = await sql`
        SELECT authid FROM identifiers
        WHERE type = 'email'
          AND value = ${email}
          AND isactive = true
      `
  
      let authUserId: string
  
      if (existing) {
        authUserId = existing.authid
      } else {
        const [{ id }] = await sql`
          INSERT INTO auth_user (name, isactive)
          VALUES (${name}, true)
          RETURNING id
        `
        authUserId = id
  
        try {
          await sql`
            INSERT INTO identifiers (authid, type, value, isverified, isactive)
            VALUES (${authUserId}, 'email', ${email}, true, true)
          `
        } catch (err: any) {
          const [row] = await sql`
            SELECT authid FROM identifiers
            WHERE type = 'email'
              AND value = ${email}
              AND isactive = true
          `
          authUserId = row.authid
        }
      }
  
      await sql`
        UPDATE otps
        SET isverified = true,
            isactive = false,
            verifiedat = NOW()
        WHERE id = ${otpRow.id}
      `
  
      const accessToken = jwt.sign(
        {
          sub: authUserId,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 10 * 60,
          jti: crypto.randomUUID(),
        },
        process.env.JWT_PRIVATE_KEY!,
        { algorithm: "HS256" }
      )
  
      res.json({ success: true, accessToken })
    } catch (err) {
      next(err)
    }
  }
  