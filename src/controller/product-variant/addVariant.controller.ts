import { Request, Response, NextFunction } from 'express'
import { prisma } from "@/lib/prisma"
// id          String   @id @map("_id") @default(auto()) @db.ObjectId
// productId   String   @db.ObjectId
// product     Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
// sku         String   @unique  
// name        String  
// attributes  Json     
// price       Float
// costPrice   Float
// oldPrice    Float?   
// warehouseId String   @db.ObjectId
// warehouse   Warehouse @relation(fields: [warehouseId], references: [id])
// quantity    Int      @default(0)
// lowStock    Int      @default(10)
// status      VariantStatus @default(ACTIVE)
// isPublished Boolean  @default(false)
// medias      VariantMedia[]
// weight      Float?  
// createdAt   DateTime @default(now())
// updatedAt   DateTime @updatedAt
export const addVariantController = async( req: Request, res: Response, next: NextFunction ) => {
    try {
        const body = await req.body;
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
        } = await body

        if(!productId || !sku || !name || !costPrice || !price || !oldPrice) {
            return res.status(400).json(
                {
                    message: "Missing some required information"
                }
            )
        }

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
        )

        return res.status(200).json(
            {
                message: "Create Successfully Product Variant",
                data: createProductVariant
            }
        )
    }
    catch(error)
    {
        next(error)
    }
}