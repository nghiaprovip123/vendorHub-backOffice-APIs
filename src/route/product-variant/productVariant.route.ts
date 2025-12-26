import { Router } from 'express'
import { variantImageController } from '@/controller/product-variant/addVariantImage.controller'
import multer from 'multer'
import { addVariantController } from "@/controller/product-variant/addVariant.controller"
import { productVariantSchema } from "@/validation/product-variant/productVariant.validation"
import { validate } from '@/middlewares/validate.middleware';

const ProductVariantRouter = Router();

const storage = multer.memoryStorage();
const upload = multer( {storage} )

// ============================================
// product-variant/variant-images
// ============================================
ProductVariantRouter.post(
  "/add-variant-images",
  upload.array('file', 5),
  variantImageController
)

ProductVariantRouter.post(
  "/add-variant",
  validate(productVariantSchema.variant),
  addVariantController
)

export default ProductVariantRouter;