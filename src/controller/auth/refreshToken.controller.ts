import { Request, Response, NextFunction } from "express";
import { refreshToken } from "@/services/auth/refreshToken.service"

export const refreshTokenController = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const getRefreshTokenFromCookie = await req.cookies.refreshToken;

        const responseController = await refreshToken({
            refreshToken: getRefreshTokenFromCookie,});        
        
        const { accessToken } = await responseController
        
        return res.status(200).json(
            { message: "Refresh Sucessfully Access Token", accessToken }
        )
    }
    catch (error) {
        next(error)
    }
}