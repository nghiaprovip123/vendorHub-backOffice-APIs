import { prisma } from "@/lib/prisma"
import jwt, { JwtPayload } from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { authSchema } from "@/validation/auth/auth.validation"
import * as z from 'zod'

type loginType = z.infer<typeof authSchema.login>;


export const login = async ({email, password}: loginType) => {
    const user = await prisma.user.findUnique(
        {
            where: {email}
        }
    )
    
    if (!user) {
        throw new Error("This email doens't exist in the system")
    }

    const loginPassword = await bcrypt.compare(password, user.password)

    if (!loginPassword) {
        throw new Error("Sorry, wrong password!")
    }

    const accessToken = await jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
    )

    const refreshToken = await jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    )

    await prisma.user.update(
        {
            where: {email},
            data: {refreshToken}
        }
    )

    return {accessToken, refreshToken}
}