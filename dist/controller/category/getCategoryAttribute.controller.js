"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryAttributeController = void 0;
const getCategoryAttribute_service_1 = require("../../services/category/getCategoryAttribute.service");
const getCategoryAttributeController = async (req, res, next) => {
    try {
        const { categoryId } = req.params; // Clean destructuring
        const responseController = await (0, getCategoryAttribute_service_1.getCategoryAttribute)(categoryId);
        // Fixed syntax here
        return res.status(200).json({
            message: "Get Successfully Category Attribute",
            data: responseController
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCategoryAttributeController = getCategoryAttributeController;
