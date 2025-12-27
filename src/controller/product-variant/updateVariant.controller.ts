import { Request, Response, NextFunction } from "express"
import { updateVariant } from "@/services/product-variant/updateVariant.service"

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

        const responseController = await updateVariant(id, {
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
        })

        return res.status(201).json(
            {
                message: "Update Successfully a Variant",
                data: responseController
            }
        )
    }
    catch (error) {
        next(error)
    }
}