import * as z from 'zod'

export const productVariantSchema = {
    variantImage: z.object(
        {
            url: z.url(),
            variantId: z.string(),
        }
    ),
    fileImage: z.object(
        {
            file: z.file(),
        }
    )
}