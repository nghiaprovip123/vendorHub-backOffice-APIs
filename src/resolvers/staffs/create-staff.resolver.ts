// resolvers/staff.resolver.ts
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/utils/upload-helper";
import { GraphQLUpload } from 'graphql-upload-minimal';

export const CreateStaff = {
  Upload: GraphQLUpload, 

  Mutation: {
    createStaff: async(
      _: unknown,
      args: { input: any },
      ctx: any
    ) => {
      try {
        let avatar_url: string | undefined;
        
        // Handle file upload if provided
        if (args.input.avatar) {
          const file = await args.input.avatar;
          const stream = file.createReadStream();
          const upload = await uploadToCloudinary(stream, "Staff Avatar Storage");
          avatar_url = upload.secure_url;
        }

        // Create staff with working hours in a transaction
        const result = await prisma.$transaction(async (tx) => {
          // Create staff
          const staff = await tx.staff.create({
            data: { 
              fullName: args.input.fullName,
              avatar_url: avatar_url,
              timezone: args.input.timezone,
              isActive: args.input.isActive ?? true,
              isDeleted: args.input.isDeleted ?? false,
            }
          });

          // Create working hours
          const workingHours = await Promise.all(
            args.input.workingHours.map((wh: any) => 
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
            workingHours: workingHours,
          };
        });

        return result;
      } catch (error: any) {
        console.error("Error creating staff:", error);
        throw new Error(error.message || "Failed to create staff");
      }
    }
  }
};