"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneVariantController = void 0;
const prisma_1 = require("../../lib/prisma");
const cloneVariantController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Missing ID Information"
            });
        }
        const findNeededCloneVariant = await prisma_1.prisma.productVariant.findUnique({
            where: { id }
        });
        if (!findNeededCloneVariant) {
            return res.status(400).json({
                message: "Missing Required Information"
            });
        }
        const createCloneVariant = await prisma_1.prisma.productVariant.create({
            data: {
                productId: findNeededCloneVariant?.productId,
                name: findNeededCloneVariant?.name,
                price: findNeededCloneVariant?.price,
                costPrice: findNeededCloneVariant?.costPrice,
                oldPrice: findNeededCloneVariant?.oldPrice,
                warehouseId: findNeededCloneVariant?.warehouseId,
                quantity: findNeededCloneVariant?.quantity,
                lowStock: findNeededCloneVariant?.lowStock,
                isPublished: findNeededCloneVariant?.isPublished,
                weight: findNeededCloneVariant?.weight,
            }
        });
        return res.status(200).json({
            message: "Clone Successfully Variant!",
            cloneEntity: createCloneVariant
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Unknown Error",
        });
    }
};
exports.cloneVariantController = cloneVariantController;
