import { validate } from "@/middlewares/validate.middleware"
import { getCategoryAttributeController } from "@/controller/category/getCategoryAttribute.controller"
import { Router } from 'express'

const CategoryRoute = Router()

CategoryRoute.get(
    "/get-category-attribute/:categoryId",
    getCategoryAttributeController
)

export default CategoryRoute;