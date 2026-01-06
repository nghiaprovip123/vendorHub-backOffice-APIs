// resolvers/staff.resolver.ts
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/utils/upload-helper";
import { GraphQLUpload } from 'graphql-upload-minimal';

interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}

interface WorkingHourInput {
  day: string;
  startTime: string;
  endTime: string;
}

interface CreateStaffInput {
  fullName: string;
  avatar?: Promise<FileUpload>; // Upload is a Promise
  timezone: string;
  isActive?: boolean;
  workingHours: WorkingHourInput[];
}

export const CreateStaffResolver = {
  Upload: GraphQLUpload, // IMPORTANT: Add this scalar resolver

  Mutation: {
    createStaff: async (
      _: unknown,
      { input }: { input: CreateStaffInput },
      ctx: any
    ) => {
      try {
        let avatar_url: string | null = null;

        // Handle avatar upload if provided
        if (input.avatar) {
          const file = await input.avatar; // Await the promise
          const stream = file.createReadStream();

          const uploaded = await uploadToCloudinary(stream, "Staff");
          avatar_url = uploaded.secure_url;

          console.log('✅ Avatar uploaded:', avatar_url);
        }

        // Create staff
        const staff = await prisma.staff.create({
          data: {
            fullName: input.fullName,
            avatar_url: avatar_url, // Use uploaded URL
            timezone: input.timezone,
            isActive: input.isActive ?? true,
          },
        });

        // Create working hours
        const workingHours = await Promise.all(
          input.workingHours.map((wh) =>
            prisma.workingHour.create({
              data: {
                day: wh.day,
                startTime: wh.startTime,
                endTime: wh.endTime,
                staffId: staff.id,
              },
            })
          )
        );

        return {
          id: staff.id,
          fullName: staff.fullName,
          avatar_url: staff.avatar_url,
          timezone: staff.timezone,
          isActive: staff.isActive,
          workingHours: workingHours,
        };
      } catch (error: any) {
        console.error("❌ Create staff error:", error);
        throw new Error(`Failed to create staff member: ${error.message}`);
      }
    },
  },
};