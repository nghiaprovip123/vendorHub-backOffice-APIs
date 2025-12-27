import { Response, Request, NextFunction } from "express";
import { prisma } from "@/lib/prisma";

export const getCategoryAttributeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params; // Clean destructuring

        if (!categoryId) {
            return res.status(400).json({ message: "Missing Category ID" });
        }

        const getCategoryAttribute = await prisma.categoryAttribute.findMany({
            where: { categoryId },
            select: { 
                id: true,
                categoryId: true,
                values: true,
             }
        });

        // Fixed syntax here
        return res.status(200).json({
            message: "Get Successfully Category Attribute",
            data: getCategoryAttribute
        });
    } catch (error) {
        next(error);
    }
}