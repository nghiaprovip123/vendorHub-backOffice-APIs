import { Request, Response, NextFunction } from "express"
import sql from "@/lib/postgresql"
import ApiError from "@/utils/ApiError"
import crypto from "crypto"
import { sendOtpEmailRegisteration } from "@/lib/send-otp-helper"
import { SendOTPSchema } from "@/validation/auth/auth.validation"
import * as z from "zod"
type SendOTPServiceType = z.infer< typeof SendOTPSchema >
export const SendOTPService = async ({phone, type, email}: SendOTPServiceType) => {
    if(!email || !phone) {
        throw new ApiError(400, 'Email is required')
    }

    const [{count}] = await sql`
        SELECT COUNT(*)::int AS count 
        FROM otps
        WHERE type = ${type}
            AND email = ${email}
            AND createdat > NOW() - INTERVAL '15 minutes'
    `
    if (count > 3) {
        throw new ApiError(429, "KHÔNG THỂ GỬI OTP VÌ SỐ LẦN GỬI OTP ĐÃ ĐẠT GIỚI HẠN")
    }

    await sql`
        UPDATE otps
        SET isverified = true
            AND isactive = false
        WHERE type = ${type}
            AND email = ${email}
            AND phone = ${phone}
            AND isverified = false
            AND isactive = true
    `

    const generateOTP = await crypto.randomInt(100000, 999999).toString()

    const [{expiresat}] = await sql`
        INSERT INTO otps (
            type, 
            email,
            otp,
            expiresat,
            phone
        ) VALUES (
            ${type},
            ${email},
            ${generateOTP},
            NOW() + INTERVAL '15 Minutes',
            ${phone}
        )
        RETURNING expiresAt
    `

    const [sendOTP] = await sql`
        SELECT *
        FROM otps
        WHERE email = ${email}
        AND isactive = true
        AND isverified = false
    `


    await sendOtpEmailRegisteration(email, generateOTP);
    return {
        otp: sendOTP,
        expiresAt: expiresat,
        remainingAttempts: 3 - count
    }
}
  