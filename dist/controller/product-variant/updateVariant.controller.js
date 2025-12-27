"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVariantController = void 0;
const updateVariant_service_1 = require("../../services/product-variant/updateVariant.service");
const updateVariantController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const { productId, sku, name, price, costPrice, oldPrice, warehouseId, quantity, lowStock, isPublished, weight } = body;
        const responseController = await (0, updateVariant_service_1.updateVariant)(id, {
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
        });
        return res.status(201).json({
            message: "Update Successfully a Variant",
            data: responseController
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateVariantController = updateVariantController;
