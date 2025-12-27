import { Response, Request, NextFunction } from "express";
import { prisma } from "@/lib/prisma";
import { getCategoryAttribute } from "@/services/category/getCategoryAttribute.service"
export const getCategoryAttributeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params; // Clean destructuring

        const responseController = await getCategoryAttribute(categoryId)

        // Fixed syntax here
        return res.status(200).json({
            message: "Get Successfully Category Attribute",
            data: responseController
        });
    } catch (error) {
        next(error);
    }
}