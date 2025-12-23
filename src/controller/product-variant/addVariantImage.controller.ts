import { variantImage } from "@/services/product-variant/variantImage.service"
import { Request, Response, NextFunction } from 'express'

export const variantImageController = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const body = req.body;
        const responseController = await variantImage(body);
        return res.status(200).json(
            {message: "Upload Successfully Variant Image!"}
        )
    }
    catch (error) {
        next(error)
    }
}