"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStaffService = void 0;
const prisma_1 = require("../../lib/prisma");
const replace_img_helper_1 = require("../../utils/replace-img-helper");
const updateStaffService = async (input) => {
    let avatar_url;
    if (input.avatar) {
        const file = await input.avatar;
        const stream = file.createReadStream();
        const replaceImage = await (0, replace_img_helper_1.replaceImageOnCloudinary)(stream, "Staff Avatar Storage", "rqvosutgecru7tutqcdu", true);
        avatar_url = replaceImage.secure_url;
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const staff = await tx.staff.update({
            where: {
                id: input.id
            },
            data: {
                fullName: input.fullName,
                avatar_url: avatar_url,
                timezone: input.timezone,
                isActive: input.isActive,
                isDeleted: input.isDeleted,
            }
        });
        if (input.workingHours?.length) {
            await tx.workingHour.deleteMany({
                where: { staffId: staff.id },
            });
            const workingHours = await Promise.all(input.workingHours.map((wh) => tx.workingHour.create({
                data: {
                    staffId: staff.id,
                    day: wh.day,
                    startTime: wh.startTime,
                    endTime: wh.endTime,
                },
            })));
            return {
                ...staff,
                workingHours: workingHours
            };
        }
    });
    return result;
};
exports.updateStaffService = updateStaffService;
