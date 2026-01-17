import { Request, Response, NextFunction } from "express";
import { CreatePasswordService } from "@/services/auth/create-password.service";

const authPasswordService = new CreatePasswordService();

export const CreatePasswordController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { password } = req.body ?? {};
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "THIẾU THÔNG TIN PASSWORD",
            });
        }

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "THIẾU THÔNG TIN HEADER AUTHORIZATION",
            });
        }

        const token = authHeader.split(" ")[1];

        const user = await authPasswordService.createPassword({
            token,
            password,
        });

        return res.status(200).json({
            success: true,
            return: user,
        });
    } catch (err) {
        next(err);
    }
};
