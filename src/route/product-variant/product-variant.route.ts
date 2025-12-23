import { Router } from 'express'
import { variantImageController } from '@/controller/product-variant/addVariantImage.controller'
const ProductVariantRouter = Router();
// ============================================
// auth/callback/google
// ============================================
ProductVariantRouter.post(
    "/upload-variant-image",
    variantImageController
)

export default ProductVariantRouter;

