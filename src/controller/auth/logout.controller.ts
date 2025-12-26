import { Request, Response, NextFunction } from "express";

export const logoutController = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        res.cookie("refreshToken", "0", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            expires: new Date(0),
            sameSite: "strict", 
            path: "/",
        });

        return res.status(200).json(
            { message: "Log-out Successfully" }
        )
    }
    catch(error) {
        next(error)
    }
}

