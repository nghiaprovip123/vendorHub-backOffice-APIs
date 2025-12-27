import { Request, Response, NextFunction } from "express"
import { prisma } from "@/lib/prisma"
import { cloneVariant } from "@/services/product-variant/cloneVariant.service"

export const cloneVariantController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const responseController = await cloneVariant(id)
        
        return res.status(200).json(
            {
                message: "Clone Successfully Variant!",
                cloneEntity: responseController
            }
        )
    }
    catch(error) {
        return res.status(500).json(
            {
                message: "Unknown Error",
            }
        )
    }
}