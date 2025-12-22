import { googleAuth } from "@/services/auth/googleAuth.service";
import { Request, Response, NextFunction } from "express";

export const googleAuthController = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const code = req.query.code as string;
        const responseController = await googleAuth({code})
        const refreshToken = await responseController;
        res.cookie("refreshToken", refreshToken, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        })

        res.status(201).json(
            { message: "Login by Google Successfully"}
        )
    }
    catch (error) {
        next(error)
    }
}