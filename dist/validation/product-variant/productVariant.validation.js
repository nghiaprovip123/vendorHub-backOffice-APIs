"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.productVariantSchema = void 0;
const z = __importStar(require("zod"));
exports.productVariantSchema = {
    CreateUpdateVariant: z.object({
        productId: z
            .string()
            .min(1, "productId is required"),
        sku: z
            .string()
            .min(1, "sku is required"),
        name: z
            .string()
            .min(1, "name is required"),
        price: z
            .number()
            .positive("price must be greater than 0"),
        costPrice: z
            .number()
            .nonnegative("costPrice must be >= 0"),
        oldPrice: z
            .number()
            .nonnegative("oldPrice must be >= 0"),
        warehouseId: z
            .string()
            .min(1, "warehouseId is required"),
        quantity: z
            .number()
            .int("quantity must be an integer")
            .nonnegative()
            .default(0),
        lowStock: z
            .number()
            .int("lowStock must be an integer")
            .nonnegative()
            .default(10),
        isPublished: z
            .boolean()
            .default(false),
        weight: z
            .number()
            .positive("weight must be greater than 0")
    }),
    CloneVariant: z.object({
        sku: z
            .string()
            .min(1, "sku is required"),
    }),
    variantImage: z.object({
        url: z.
            url(),
        variantId: z.
            string(),
    }),
    fileImage: z.object({
        file: z.
            file(),
    })
};
