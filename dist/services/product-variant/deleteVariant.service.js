"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVariant = void 0;
const prisma_1 = require("../../lib/prisma");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const deleteVariant = async (id) => {
    if (!id) {
        throw new ApiError_1.default(400, "Missing Variant ID for Deletion");
    }
    const deleteVariant = await prisma_1.prisma.productVariant.delete({
        where: { id },
        select: {
            id: true,
            name: true
        }
    });
    if (!deleteVariant) {
        throw new ApiError_1.default(500, "Fail to Delete Product Variant");
    }
    return deleteVariant;
};
exports.deleteVariant = deleteVariant;
