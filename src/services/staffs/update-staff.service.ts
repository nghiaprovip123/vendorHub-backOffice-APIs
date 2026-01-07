import { prisma } from "@/lib/prisma"
import { replaceImageOnCloudinary } from "@/utils/replace-img-helper"
import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";
import * as z from "zod"
import { updateStaffSchema } from "@/validation/staffs/staffs.validation"
import { createWorkingHourSchema } from "@/validation/staffs/staffs.validation"

type UpdateStaffType = z.infer< typeof updateStaffSchema >

export const updateStaffService = async (input: UpdateStaffType) => {
        let avatar_url: string | undefined

        if (input.avatar) {
            const file = await input.avatar;
            const stream = file.createReadStream()
            const replaceImage = await replaceImageOnCloudinary(stream, "Staff Avatar Storage", "rqvosutgecru7tutqcdu", true)
            avatar_url = replaceImage.secure_url
        }
    
        const result = await prisma.$transaction( async(tx) => {
            const staff = await tx.staff.update(
                {
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
                }
            )
        
            if (input.workingHours?.length) {
                await tx.workingHour.deleteMany({
                  where: { staffId: staff.id },
                });
              
                const workingHours = await Promise.all(
                  input.workingHours.map((wh) =>
                    tx.workingHour.create({
                      data: {
                        staffId: staff.id,
                        day: wh.day,
                        startTime: wh.startTime,
                        endTime: wh.endTime,
                      },
                    })
                  )
                );
            return {
                ...staff,
                workingHours: workingHours
            }
        } 
        }
    )
    return result
}