"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addVariantImage_controller_1 = require("../../controller/product-variant/addVariantImage.controller");
const multer_1 = __importDefault(require("multer"));
const addVariant_controller_1 = require("../../controller/product-variant/addVariant.controller");
const updateVariant_controller_1 = require("../../controller/product-variant/updateVariant.controller");
const productVariant_validation_1 = require("../../validation/product-variant/productVariant.validation");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const ProductVariantRouter = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
// ============================================
// product-variant/variant-images
// ============================================
ProductVariantRouter.post("/add-variant-images", upload.array('file', 5), addVariantImage_controller_1.variantImageController);
// ============================================
// product-variant/add-variant
// ============================================
ProductVariantRouter.post("/add-variant", (0, validate_middleware_1.validate)(productVariant_validation_1.productVariantSchema.variant), addVariant_controller_1.addVariantController);
// ============================================
// product-variant/update-variant/:id
// ============================================
ProductVariantRouter.patch("/update-variant/:id", (0, validate_middleware_1.validate)(productVariant_validation_1.productVariantSchema.variant), updateVariant_controller_1.updateVariantController);
exports.default = ProductVariantRouter;
