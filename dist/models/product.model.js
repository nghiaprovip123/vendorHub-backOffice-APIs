"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Chỉ dùng để push dữ liệu vào DB (Service = Product)
 */
exports.productModel = {
    createProductModel(data) {
        return prisma.service.create({
            data: {
                tenantId: data.tenantId,
                userId: data.userId,
                sellerId: data.sellerId,
                code: data.code,
                title: data.title,
                description: data.description,
                slug: data.slug,
                tags: data.tags ?? [],
                pricingType: data.pricingType ?? client_1.PricingType.FIXED,
                currency: data.currency ?? "VND",
                displayPrice: data.displayPrice ?? true,
                taxIncluded: data.taxIncluded ?? true,
                taxRateBps: data.taxRateBps,
                durationMin: data.durationMin,
                bufferBeforeMin: data.bufferBeforeMin ?? 0,
                bufferAfterMin: data.bufferAfterMin ?? 0,
                minStaffCount: data.minStaffCount ?? 1,
                maxStaffCount: data.maxStaffCount ?? 1,
                isBookable: data.isBookable ?? true,
                requiresDeposit: data.requiresDeposit ?? false,
                depositAmount: data.depositAmount,
                featured: data.featured ?? false,
                badge: data.badge,
                highlightColor: data.highlightColor,
                displayOrder: data.displayOrder ?? 0,
                isActive: data.isActive ?? true,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
            },
        });
    },
};
