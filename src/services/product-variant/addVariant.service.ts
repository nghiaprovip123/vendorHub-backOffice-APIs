import { prisma } from "@/lib/prisma"
import ApiError from "@/utils/ApiError"
import * as z from 'zod'
import { productVariantSchema } from '@/validation/product-variant/productVariant.validation'

type addVariantType = z.infer< typeof productVariantSchema.variant >

export const addVariant = async (
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
    }: addVariantType
) => {
    
    if(!productId || !sku || !name || !costPrice || !price || !oldPrice) {
        throw new ApiError(400, "Missing required information")
    };

    const createProductVariant = await prisma.productVariant.create(
        {
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
    );

    return createProductVariant;
}