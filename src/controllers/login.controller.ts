import { Request, Response, NextFunction } from "express"
import ApiError from "@/utils/ApiError"
import argon2 from "argon2"
import sql from '@/lib/postgreSQL'


export const LoginController = async(req: Request, res: Response, next: NextFunction) => {
    const body = await req.body

    const { email, phone, password } = body

    if (!phone || !password) {
        return new ApiError(400, "Phone and password are required")
    }
    const rows = await sql`
      SELECT 
        au.id,
        au.passwordHash,
        au.isActive,
        au.lockedAt,
        au.deletedAt
      FROM identifiers i
      JOIN auth_user au ON au.id = i.authId
      WHERE i.type = 'phone'
        AND i.value = ${phone}
        AND i.isActive = TRUE
        AND i.isVerified = TRUE
        AND i.deletedAt IS NULL
      LIMIT 1`

    if (rows.length === 0) {
        return new ApiError(401, "Invalid credentials")
    }

  const user = rows[0]
  if (!user.isactive || user.deletedat || user.lockedat) {
    return new ApiError(403, "Account is not available")
  }

  const isValid = await argon2.verify(user.passwordHash, password)

  if (!isValid) {
    return new ApiError(401, "Invalid credentials")
  }
  
  res.status(200).json({ success: true })
}