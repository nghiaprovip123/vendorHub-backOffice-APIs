"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryAttributeController = void 0;
const prisma_1 = require("../../lib/prisma");
const getCategoryAttributeController = async (req, res, next) => {
    try {
        const { categoryId } = req.params; // Clean destructuring
        if (!categoryId) {
            return res.status(400).json({ message: "Missing Category ID" });
        }
        const getCategoryAttribute = await prisma_1.prisma.categoryAttribute.findMany({
            where: { categoryId }
        });
        // Fixed syntax here
        return res.status(200).json({
            message: "Get Successfully Category Attribute",
            data: getCategoryAttribute
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCategoryAttributeController = getCategoryAttributeController;
