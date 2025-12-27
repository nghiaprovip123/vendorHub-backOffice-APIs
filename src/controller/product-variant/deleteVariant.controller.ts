import { Request, Response, NextFunction } from "express"
import { deleteVariant } from "@/services/product-variant/deleteVariant.service"
export const deleteVariantController = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = await req.params

        const responseController = await deleteVariant(id)

        return res.status(200).json(
            {
                message: "Delete Succesfully the Product Variant",
                DeleteVariant: responseController
            }
        )
    }
    catch (error) {
        next(error)
    }
}