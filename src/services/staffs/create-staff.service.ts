// resolvers/staff.resolver.ts
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/utils/upload-helper";
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import * as z from "zod";
import { createWorkingHourSchema, createStaffSchema } from "@/validation/staffs/staffs.validation"

type createStaffServiceType = z.infer< typeof createStaffSchema >;

export const createStaffService = async(input: createStaffServiceType) => {
    let avatar_url: string | undefined;
    if (input.avatar) {
      const file = await input.avatar;
      const stream = file.createReadStream();
      const upload = await uploadToCloudinary(stream, "Staff Avatar Storage");
      avatar_url = upload.secure_url;
    }

    const result = await prisma.$transaction(async (tx) => {
      const staff = await tx.staff.create({
        data: { 
          fullName: input.fullName,
          avatar_url: avatar_url,
          timezone: input.timezone,
          isActive: input.isActive ?? true,
          isDeleted: input.isDeleted ?? false,
        }
      });

      const createworkingHours = await Promise.all(
        input.workingHours.map((wh: any) => 
          tx.workingHour.create({
            data: {
              day: wh.day,
              startTime: wh.startTime,
              endTime: wh.endTime,
              staffId: staff.id
            }
          })
        )
      );

      return {
        ...staff,
        workingHours: createworkingHours,
      };
    });

    return result;
  } 