"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVariant = void 0;
const prisma_1 = require("../../lib/prisma");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const addVariant = async ({ productId, sku, name, price, costPrice, oldPrice, warehouseId, quantity, lowStock, isPublished, weight }) => {
    if (!productId || !sku || !name || !costPrice || !price || !oldPrice) {
        throw new ApiError_1.default(400, "Missing required information");
    }
    ;
    const createProductVariant = await prisma_1.prisma.productVariant.create({
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
    return createProductVariant;
};
exports.addVariant = addVariant;
