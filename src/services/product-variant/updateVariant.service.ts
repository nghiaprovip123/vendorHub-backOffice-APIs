import { prisma } from "@/lib/prisma"
import ApiError from "@/utils/ApiError"
import * as z from "zod"
import { productVariantSchema } from "@/validation/product-variant/productVariant.validation"

type updateVariantType = z.infer< typeof productVariantSchema.variant >

export const updateVariant = async (
    id: string, 
    {
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
    }: updateVariantType
) => {

    if(!id) {
        throw new ApiError(400, "Category ID is required")
    }

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

    if (!updateVariant) {
        throw new ApiError(500, "Fail to update the Variant")
    }

    return updateVariant;
}