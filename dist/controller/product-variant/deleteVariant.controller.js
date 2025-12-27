"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVariantController = void 0;
const deleteVariant_service_1 = require("../../services/product-variant/deleteVariant.service");
const deleteVariantController = async (req, res, next) => {
    try {
        const { id } = await req.params;
        const responseController = await (0, deleteVariant_service_1.deleteVariant)(id);
        return res.status(200).json({
            message: "Delete Succesfully the Product Variant",
            DeleteVariant: responseController
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteVariantController = deleteVariantController;
