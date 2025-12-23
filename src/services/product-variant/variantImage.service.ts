import { prisma } from '@/lib/prisma'
import ApiError from '@/utils/ApiError'
import { createVariantUrl } from '@/utils/VariantImage'

type VariantImageType = {
    url: string,
}

export const variantImage = async ( {url}: VariantImageType ) => {
    if(!url) {
        throw new ApiError(401, "Variant ID and URL are required")
    };

    const uploadResult = await createVariantUrl({url});

    if(!uploadResult.secureUrl) {
        throw new ApiError(400, 'Fail to fetch Secure Url')
    };

    const createVariantImage = await prisma.variantMedia.create(
        {
            data: {
                url: uploadResult.secureUrl,
            }
        }
    );

    return createVariantImage;
}
