"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductsValid = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createProductsValid = zod_1.z
    .object({
    id: zod_1.z.string().min(1, "ID is required"),
    title: zod_1.z.string().min(1, "Title is required"),
    slug: zod_1.z.string().min(1, "Slug is required"),
    tags: zod_1.z.array(zod_1.z.string()).min(1, "At least one tag is required"),
    pricingType: zod_1.z.nativeEnum(client_1.PricingType),
    currency: zod_1.z.string().optional(),
    displayPrice: zod_1.z.boolean().optional(),
    taxIncluded: zod_1.z.boolean().optional(),
    taxRateBps: zod_1.z.number().optional(),
    durationMin: zod_1.z.number().optional(),
    bufferBeforeMin: zod_1.z.number().optional(),
    bufferAfterMin: zod_1.z.number().optional(),
    minStaffCount: zod_1.z.number().optional(),
    maxStaffCount: zod_1.z.number().optional(),
    isBookable: zod_1.z.boolean().optional(),
    requiresDeposit: zod_1.z.boolean().optional(),
    depositAmount: zod_1.z.number().optional(),
    featured: zod_1.z.boolean().optional(),
    badge: zod_1.z.string().optional(),
    highlightColor: zod_1.z.string().optional(),
    displayOrder: zod_1.z.number().optional(),
    isActive: zod_1.z.boolean().optional(),
    metaTitle: zod_1.z.string().optional(),
    metaDescription: zod_1.z.string().optional(),
})
    .passthrough();
