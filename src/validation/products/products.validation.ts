import { z } from "zod";
import { PricingType } from "@prisma/client";
export const createProductsValid = z
  .object({
    tenantId: z.string().optional(),
    userId: z.string().optional(),
    sellerId: z.string().optional(),
    code: z.string(),
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string(),
    tags: z.array(z.string()).min(1, "At least one tag is required"),

    pricingType: z.nativeEnum(PricingType),

    currency: z.string().optional(),
    displayPrice: z.boolean().optional(),

    taxIncluded: z.boolean().optional(),
    taxRateBps: z.number().optional(),

    durationMin: z.number().optional(),
    bufferBeforeMin: z.number().optional(),
    bufferAfterMin: z.number().optional(),

    minStaffCount: z.number().optional(),
    maxStaffCount: z.number().optional(),

    isBookable: z.boolean().optional(),
    requiresDeposit: z.boolean().optional(),
    depositAmount: z.number().optional(),

    featured: z.boolean().optional(),
    badge: z.string().optional(),
    highlightColor: z.string().optional(),
    displayOrder: z.number().optional(),
    isActive: z.boolean().optional(),

    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  })
  .passthrough();
