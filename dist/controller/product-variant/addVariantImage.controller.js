"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantImageController = void 0;
const addVariantImage_service_1 = require("../../services/product-variant/addVariantImage.service");
const variantImageController = async (req, res, next) => {
    try {
        const files = req.files;
        const body = req.body;
        const { variantId } = body;
        const controllerResponse = await (0, addVariantImage_service_1.variantImage)(files, variantId);
        return res.status(200).json({
            message: "Upload Variant Image Successfully!",
            data: controllerResponse,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.variantImageController = variantImageController;
