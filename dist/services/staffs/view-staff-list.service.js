"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaffListService = void 0;
const prisma_1 = require("../../lib/prisma");
const PAGE_SIZE = 10;
const getStaffListService = async (page) => {
    try {
        const getPage = page ?? 1;
        const skip = (getPage - 1) * PAGE_SIZE;
        const staffs = await prisma_1.prisma.staff.findMany({
            skip,
            take: PAGE_SIZE,
        });
        const total = await prisma_1.prisma.staff.count();
        return {
            items: staffs,
            total
        };
    }
    catch (error) {
        throw new Error("Fail to fetch list of staffs");
    }
};
exports.getStaffListService = getStaffListService;
