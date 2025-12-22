import { prisma } from '@/lib/prisma'
import jwt, { JwtPayload } from "jsonwebtoken"

type refreshTokenType = {
    refreshToken: string,
}
export const refreshToken = async ({ refreshToken }: refreshTokenType) => {
    if (!refreshToken) {
        throw new Error("Unthorization - No refreshToken")
    }

    const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET!
      ) as JwtPayload;

    const userId = decoded.id;

    const user = await prisma.user.findUnique({
        where: { id: userId }
      });   

    if (!user) {
        throw new Error("User doesn't exist")
    }

    if (user.refreshToken !== refreshToken) {
        throw new Error("Token mismatch")
    }

    const accessToken = await jwt.sign(
        { id: userId },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
    )

    return { accessToken }

}