"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneVariantController = void 0;
const cloneVariant_service_1 = require("../../services/product-variant/cloneVariant.service");
const cloneVariantController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sku = String(req.body.sku).trim();
        console.log("Received id:", id, "Received sku:", sku);
        const responseController = await (0, cloneVariant_service_1.cloneVariant)(id, sku);
        return res.status(200).json({
            message: "Clone Successfully Variant!",
            cloneEntity: responseController
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Unknown Error",
        });
    }
};
exports.cloneVariantController = cloneVariantController;
