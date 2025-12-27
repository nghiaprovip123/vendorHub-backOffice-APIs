import { Router } from 'express'
import { variantImageController } from '@/controller/product-variant/addVariantImage.controller'
import multer from 'multer'
import { addVariantController } from "@/controller/product-variant/addVariant.controller"
import { updateVariantController } from "@/controller/product-variant/updateVariant.controller"
import { productVariantSchema } from "@/validation/product-variant/productVariant.validation"
import { validate } from '@/middlewares/validate.middleware';
import { cloneVariantController } from "@/controller/product-variant/cloneVariant.controller"
import { deleteVariantController } from "@/controller/product-variant/deleteVariant.controller"

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
// ============================================
// product-variant/add-variant
// ============================================
ProductVariantRouter.post(
  "/add-variant",
  validate(productVariantSchema.CreateUpdateVariant),
  addVariantController
)
// ============================================
// product-variant/update-variant/:id
// ============================================
ProductVariantRouter.patch(
  "/update-variant/:id",
  validate(productVariantSchema.CreateUpdateVariant),
  updateVariantController
)
// ============================================
// product-variant/clone-variant/:id
// ============================================
ProductVariantRouter.post(
  "/clone-variant/:id",
  validate(productVariantSchema.CloneVariant),
  cloneVariantController
)
// ============================================
// product-variant/delete-variant/:id
// ============================================
ProductVariantRouter.delete(
  "/delete-variant/:id",
  deleteVariantController
)


export default ProductVariantRouter;