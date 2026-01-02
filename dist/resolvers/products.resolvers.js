"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productResolver = void 0;
// resolvers/product.resolver.ts
const createProducts_service_1 = require("../services/products/createProducts.service");
const products_validation_1 = require("../validation/products/products.validation");
exports.productResolver = {
    Mutation: {
        createProducts: async (_, args, ctx) => {
            try {
                const validatedInput = products_validation_1.createProductsValid.parse(args.input);
                const newProduct = await (0, createProducts_service_1.createProductsService)(validatedInput);
                ctx.res.status(201);
                return {
                    success: true,
                    message: "Product created successfully",
                    product: newProduct,
                };
            }
            catch (err) {
                console.error("ERROR:", err);
                ctx.res.status(400);
                return {
                    success: false,
                    message: err?.issues
                        ? err.issues
                            .map((i) => `${i.path.join(".")}: ${i.message}`)
                            .join(", ")
                        : err.message || "Invalid input",
                    product: null,
                };
            }
        },
    },
};
