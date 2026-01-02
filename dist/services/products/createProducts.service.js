"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductsService = void 0;
const product_model_1 = require("@/models/product.model");
const createProductsService = (data) => {
    const now = new Date();
    const finalData = {
        ...data,
        createdAt: now,
        updatedAt: now,
    };
    return product_model_1.productModel.createProductModel(finalData);
};
exports.createProductsService = createProductsService;
