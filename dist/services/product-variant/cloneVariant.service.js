"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneVariant = void 0;
const prisma_1 = require("../../lib/prisma");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const cloneVariant = async (id, sku) => {
    if (!id || !sku) {
        throw new ApiError_1.default(400, "Missing Need-to-Clone Variant ID and Sku Input");
    }
    const findNeededCloneVariant = await prisma_1.prisma.productVariant.findUnique({
        where: { id }
    });
    if (!findNeededCloneVariant) {
        throw new ApiError_1.default(400, "No Need-to-Clone Varaint Found");
    }
    const createCloneVariant = await prisma_1.prisma.productVariant.create({
        data: {
            productId: findNeededCloneVariant?.productId,
            sku: sku,
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
    return createCloneVariant;
};
exports.cloneVariant = cloneVariant;
