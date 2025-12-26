import { Request, Response, NextFunction } from 'express'
import { prisma } from "@/lib/prisma"
import { addVariant } from '@/services/product-variant/addVariant.service'
export const addVariantController = async( req: Request, res: Response, next: NextFunction ) => {
    try {
        const body = await req.body
        const responseController = await addVariant(body)
        return res.status(200).json(
            {
                message: "Create Successfully Product Variant",
                data: responseController
            }
        )
    }
    catch(error)
    {
        next(error)
    }
}