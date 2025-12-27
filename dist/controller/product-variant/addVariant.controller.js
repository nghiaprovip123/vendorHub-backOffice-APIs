"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVariantController = void 0;
const addVariant_service_1 = require("../../services/product-variant/addVariant.service");
const addVariantController = async (req, res, next) => {
    try {
        const body = await req.body;
        const responseController = await (0, addVariant_service_1.addVariant)(body);
        return res.status(200).json({
            message: "Create Successfully Product Variant",
            data: responseController
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addVariantController = addVariantController;
