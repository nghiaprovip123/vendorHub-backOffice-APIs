import { Response, Request, NextFunction } from "express";
import { prisma } from "@/lib/prisma";
import * as z from "zod"
import ApiError from "@/utils/ApiError"

export const getCategoryAttribute = async (categoryId: string) => {
    if (!categoryId) {
        throw new ApiError(400, "Missing Category Id Information")
    }

    const getCategoryAttribute = await prisma.categoryAttribute.findMany(
        { 
            where:
                {
                    categoryId
                },
            select: 
                {
                    id: true,
                    categoryId: true,
                    values: true
                }
        }
    )

    if (!getCategoryAttribute) {
        throw new ApiError(500, "Fail to get Category Attribute")
    };

    return getCategoryAttribute
}