import { Router } from 'express'
import { variantImageController } from '@/controller/product-variant/addVariantImage.controller'
import multer from 'multer'

const ProductVariantRouter = Router();

const storage = multer.memoryStorage();
const upload = multer( {storage} )

// ============================================
// product-variant/variant-images
// ============================================
ProductVariantRouter.post(
  "/variant-images",
  upload.single('file'),
  variantImageController
)

export default ProductVariantRouter;