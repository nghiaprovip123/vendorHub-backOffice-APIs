import { Request, Response, NextFunction } from "express";
import { register } from "@/services/auth/register.service";

export const registerController = async ( 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    try {
        const body =  req.body;

        const controllerResponse = await register(body)

        return res.json(
            { message: "Create the account sucessfully" }
        )
    }
    catch(error) {
        next(error)
    }
}