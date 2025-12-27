import { Request, Response, NextFunction } from "express"
import { prisma } from "@/lib/prisma"

export const updateVariantController =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const body = req.body;

        const {
            productId,
            sku,
            name,
            price,
            costPrice,
            oldPrice,
            warehouseId,
            quantity,
            lowStock,
            isPublished,
            weight
        } = body

        const updateVariant = await prisma.productVariant.update(
            {
                where: {id},
                data: {
                    productId,
                    sku,
                    name,
                    price,
                    costPrice,
                    oldPrice,
                    warehouseId,
                    quantity,
                    lowStock,
                    isPublished,
                    weight           
                }
            }
        )

        return res.status(201).json(
            {
                message: "Update Product Variant Successfulyy",
                data: updateVariant
            }
        )
    }
    
    catch (error) {
        next(error)
    }
}