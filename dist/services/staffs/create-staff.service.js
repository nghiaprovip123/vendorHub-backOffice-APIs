"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStaffService = void 0;
// resolvers/staff.resolver.ts
const prisma_1 = require("../../lib/prisma");
const upload_helper_1 = require("../../utils/upload-helper");
const createStaffService = async (input) => {
    let avatar_url;
    if (input.avatar) {
        const file = await input.avatar;
        const stream = file.createReadStream();
        const upload = await (0, upload_helper_1.uploadToCloudinary)(stream, "Staff Avatar Storage");
        avatar_url = upload.secure_url;
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const staff = await tx.staff.create({
            data: {
                fullName: input.fullName,
                avatar_url: avatar_url,
                timezone: input.timezone,
                isActive: input.isActive ?? true,
                isDeleted: input.isDeleted ?? false,
            }
        });
        const createworkingHours = await Promise.all(input.workingHours.map((wh) => tx.workingHour.create({
            data: {
                day: wh.day,
                startTime: wh.startTime,
                endTime: wh.endTime,
                staffId: staff.id
            }
        })));
        return {
            ...staff,
            workingHours: createworkingHours,
        };
    });
    return result;
};
exports.createStaffService = createStaffService;
