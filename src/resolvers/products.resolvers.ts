// resolvers/product.resolver.ts
import { createProductsService } from "@/services/products/createProducts.service";
import { PricingType } from "@prisma/client";
import { createProductsValid } from "@/validation/products/products.validation";

export const productResolver = {
  Mutation: {
    createProducts: async (_: unknown, args: { input: any }, ctx: any) => {
      try {
        const validatedInput = createProductsValid.parse(args.input);

        const newProduct = await createProductsService(validatedInput);

        ctx.res.status(201);
        return {
          success: true,
          message: "Product created successfully",
          product: newProduct,
        };
      } catch (err: any) {
        console.error("ERROR:", err);

        ctx.res.status(400);
        return {
          success: false,
          message: err?.issues
            ? err.issues
                .map((i: any) => `${i.path.join(".")}: ${i.message}`)
                .join(", ")
            : err.message || "Invalid input",
          product: null,
        };
      }
    },
  },
};
