import { PrismaClient, PricingType } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Chỉ dùng để push dữ liệu vào DB (Service = Product)
 */
export const productModel = {
  createProductModel(data: {
    // Tenant
    tenantId?: string;

    // Ownership
    userId?: string;
    sellerId?: string;

    // Identity
    code?: string;
    title?: string;
    description?: string;
    slug?: string;

    // Categorization
    tags?: string[];

    // Pricing
    pricingType?: PricingType;
    currency?: string;
    displayPrice?: boolean;
    taxIncluded?: boolean;
    taxRateBps?: number;

    // Time
    durationMin?: number;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;

    // Capacity
    minStaffCount?: number;
    maxStaffCount?: number;

    // Booking rules
    isBookable?: boolean;
    requiresDeposit?: boolean;
    depositAmount?: number;

    // Presentation
    featured?: boolean;
    badge?: string;
    highlightColor?: string;
    displayOrder?: number;
    isActive?: boolean;

    // SEO
    metaTitle?: string;
    metaDescription?: string;
  }) {
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

        pricingType: data.pricingType ?? PricingType.FIXED,
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
