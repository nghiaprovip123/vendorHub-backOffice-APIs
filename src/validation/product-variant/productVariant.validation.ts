import * as z from 'zod'

export const productVariantSchema = {
    variant: z.object(
        {
            productId: z
                .string()
                .min(1, "productId is required"),

            sku: z
                .string()
                .min(1, "sku is required"),

            name: z
                .string()
                .min(1, "name is required"),

            price: z
                .number()
                .positive("price must be greater than 0"),

            costPrice: z
                .number()
                .nonnegative("costPrice must be >= 0"),

            oldPrice: z
                .number()
                .nonnegative("oldPrice must be >= 0"),

            warehouseId: z
                .string()
                .min(1, "warehouseId is required"),

            quantity: z
                .number()
                .int("quantity must be an integer")
                .nonnegative()
                .default(0),

            lowStock: z
                .number()
                .int("lowStock must be an integer")
                .nonnegative()
                .default(10),

            isPublished: z
                .boolean()
                .default(false),

            weight: z
                .number()
                .positive("weight must be greater than 0")
        }
    ),
    variantImage: z.object(
        {
            url: z.
                url(),
                variantId: z.
                string(),
        }
    ),
    fileImage: z.object(
        {
            file: z.
                file(),
        }
    )
}