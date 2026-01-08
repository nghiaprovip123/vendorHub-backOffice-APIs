"use strict";
// // resolvers/product.resolver.ts
// import { createProductsService } from "../services/products/createProducts.service";
// import { PricingType } from "@prisma/client";
// import { createProductsValid } from "../validation/products/products.validation";
// export const productResolver =     {
//   Mutation: {
//     createProducts: async (_: unknown, args: { input: any }, ctx: any) => {
//       try {
//         const Product = await createProductsService(args.input);
//         return {
//           success: true,
//           message: "Product created successfully",
//           product: Product,
//         };
//       } catch (err: any) {
//         return {
//           success: false,
//           message: "Invalid input",
//           product: null,
//         };
//       }
//     },
//   },
// };
