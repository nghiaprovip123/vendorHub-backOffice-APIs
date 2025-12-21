import { Request, Response, NextFunction } from "express";
import { login } from "@/services/auth/login.service";

export const loginController = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const body = await req.body;
        const controllerResponse = await login(body);
        const { refreshToken, accessToken } = await controllerResponse;

        res.cookie("refreshToken", refreshToken, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: 'auth/refresh-token'
        })

        res.status(201).json(
            { message: "Login successfully", accessToken: accessToken }
        )
    }
    catch(error) {
        next(error)
    }
}
