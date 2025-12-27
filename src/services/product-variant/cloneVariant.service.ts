import { Request, Response, NextFunction } from "express"
import { prisma } from "@/lib/prisma"
import ApiError from "@/utils/ApiError"

export const cloneVariant = async (id: string) => {
    if(!id) {
        throw new ApiError(400, "Missing Need-to-Clone Variant ID")
    }
    
    const findNeededCloneVariant  = await prisma.productVariant.findUnique(
        {
            where: {id}
        }
    )

    if(!findNeededCloneVariant) {
        throw new ApiError(400, "No Need-to-Clone Varaint Found")
    }

    const createCloneVariant = await prisma.productVariant.create(
        {
            data: {
                productId: findNeededCloneVariant?.productId,
                name: findNeededCloneVariant?.name,
                price: findNeededCloneVariant?.price,
                costPrice: findNeededCloneVariant?.costPrice,
                oldPrice: findNeededCloneVariant?.oldPrice,
                warehouseId: findNeededCloneVariant?.warehouseId,
                quantity: findNeededCloneVariant?.quantity,
                lowStock: findNeededCloneVariant?.lowStock,
                isPublished: findNeededCloneVariant?.isPublished,
                weight: findNeededCloneVariant?.weight,
            }
        }
    )

    return createCloneVariant
}
