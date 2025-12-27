"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVariant = void 0;
const prisma_1 = require("../../lib/prisma");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const updateVariant = async (id, { productId, sku, name, price, costPrice, oldPrice, warehouseId, quantity, lowStock, isPublished, weight }) => {
    if (!id) {
        throw new ApiError_1.default(400, "Category ID is required");
    }
    const updateVariant = await prisma_1.prisma.productVariant.update({
        where: { id },
        data: {
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
        }
    });
    if (!updateVariant) {
        throw new ApiError_1.default(500, "Fail to update the Variant");
    }
    return updateVariant;
};
exports.updateVariant = updateVariant;
