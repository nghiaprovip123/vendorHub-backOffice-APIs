"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryAttribute = void 0;
const prisma_1 = require("../../lib/prisma");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const getCategoryAttribute = async (categoryId) => {
    if (!categoryId) {
        throw new ApiError_1.default(400, "Missing Category Id Information");
    }
    const getCategoryAttribute = await prisma_1.prisma.categoryAttribute.findMany({
        where: {
            categoryId
        },
        select: {
            id: true,
            categoryId: true,
            values: true
        }
    });
    if (!getCategoryAttribute) {
        throw new ApiError_1.default(500, "Fail to get Category Attribute");
    }
    ;
    return getCategoryAttribute;
};
exports.getCategoryAttribute = getCategoryAttribute;
