import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { authService } from "@/services/auth/auth.service";
const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await authService.register(req.body);
        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(error);
    }
};
const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { accessToken, refreshToken } = await authService.login(req.body);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            path: "auth/refresh-token"
        });
        res.status(StatusCodes.OK).json({
            accessToken,
        });
    } catch (error) {
        next(error);
    }
}
export const authController = { register, login };