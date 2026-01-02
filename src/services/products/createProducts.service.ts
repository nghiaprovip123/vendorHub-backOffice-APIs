import { PricingType } from "@prisma/client";
import { productModel } from "@/models/product.model";
/**
 * ================================
 * INTERNAL TYPES (KHÔNG EXPORT)
 * ================================
 */

type createProductsInput = {
  id: string;

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
  tags: string[];

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
};
export const createProductsService =  (data:createProductsInput) =>
{
    const now = new Date();
    const finalData: createProductsInput = {
    ...data,
    createdAt: now,
    updatedAt: now,
  } as createProductsInput;
    return productModel.createProductModel(finalData)
}
