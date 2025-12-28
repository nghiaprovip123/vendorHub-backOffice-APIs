import { Request, Response, NextFunction } from "express"
import { cloneVariant } from "@/services/product-variant/cloneVariant.service"

export const cloneVariantController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const sku = String(req.body.sku).trim();
 
        console.log("Received id:", id, "Received sku:", sku);  

        const responseController = await cloneVariant(id, sku) 
        
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