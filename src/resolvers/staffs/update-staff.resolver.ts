import { prisma } from "@/lib/prisma"
import { replaceImageOnCloudinary } from "@/utils/replace-img-helper"
import { GraphQLUpload } from "graphql-upload-minimal";
const updateStaff = async (
    _: unknown,
    args: { input: any },
    ctx: any
) => {
    try {
        let avatar_url: string | undefined

        if (args.input.avatar) {
            const file = await args.input.avatar;
            const stream = file.createReadStream()
            const replaceImage = await replaceImageOnCloudinary(stream, "Staff Avatar Storage", "rqvosutgecru7tutqcdu", true)
            avatar_url = replaceImage.secure_url
        }
    
        const result = await prisma.$transaction( async(tx) => {
            const staff = await tx.staff.update(
                {
                    where: {
                        id: args.input.id
                    },
                    data: {
                        fullName: args.input.fullName,
                        avatar_url: avatar_url,
                        timezone: args.input.timezone,
                        isActive: args.input.isActive,
                        isDeleted: args.input.isDeleted,
                    }
                }
            )
        
            await tx.workingHour.deleteMany({
                where: { staffId: staff.id },
              });
              
              const workingHours = await Promise.all(
                args.input.workingHours.map((wh: any) =>
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
    )
    
    return result
    } catch (error: any) {
        throw new Error("Unknown Error")
    }
}

export const UpdateStaff = {
    Upload: GraphQLUpload, 
    Mutation : {
        updateStaff
    }
}