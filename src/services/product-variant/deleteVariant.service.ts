import { prisma } from "@/lib/prisma"
import ApiError from "@/utils/ApiError"
export const deleteVariant = async ( id: string ) => {
    if (!id) {
        throw new ApiError(400, "Missing Variant ID for Deletion")
    }
    const deleteVariant = await prisma.productVariant.delete(
        {
            where: {id},
            select: {
                id: true,
                name: true
            }
        }
    )
    if(!deleteVariant) {
        throw new ApiError(500, "Fail to Delete Product Variant")
    }

    return deleteVariant
}