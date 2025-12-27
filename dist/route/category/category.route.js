"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCategoryAttribute_controller_1 = require("../../controller/category/getCategoryAttribute.controller");
const express_1 = require("express");
const CategoryRoute = (0, express_1.Router)();
CategoryRoute.get("/get-category-attribute/:categoryId", getCategoryAttribute_controller_1.getCategoryAttributeController);
exports.default = CategoryRoute;
