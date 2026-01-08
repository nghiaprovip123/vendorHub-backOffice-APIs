"use strict";
// import { prisma } from "../lib/prisma"
// import * as z from "zod"
// import { createProductsValid } from "../validation/products/products.validation"
// type createProduct = z.infer< typeof createProductsValid >
// export const productModel = {
//   createProductModel(data: createProduct) {
//     return prisma.service.create({
//       data: {
//         userId: data.userId,
//         code: data.code,
//         title: data.title,
//         description: data.description,
//         slug: data.slug,
//         tags: data.tags ?? [],
//         pricingType: data.pricingType ?? "FIXED",
//         currency: data.currency ?? "VND",
//         displayPrice: data.displayPrice ?? true,
//         taxIncluded: data.taxIncluded ?? true,
//         taxRateBps: data.taxRateBps,
//         durationMin: data.durationMin,
//         bufferBeforeMin: data.bufferBeforeMin ?? 0,
//         bufferAfterMin: data.bufferAfterMin ?? 0,
//         minStaffCount: data.minStaffCount ?? 1,
//         maxStaffCount: data.maxStaffCount ?? 1,
//         isBookable: data.isBookable ?? true,
//         requiresDeposit: data.requiresDeposit ?? false,
//         depositAmount: data.depositAmount,
//         featured: data.featured ?? false,
//         badge: data.badge,
//         highlightColor: data.highlightColor,
//         displayOrder: data.displayOrder ?? 0,
//         isActive: data.isActive ?? true,
//         metaTitle: data.metaTitle,
//         metaDescription: data.metaDescription,
//       },
//     })
//   },
// }
