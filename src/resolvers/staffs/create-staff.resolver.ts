// resolvers/staff.resolver.ts
import { prisma } from "@/lib/prisma"; // Assuming Prisma client is correctly set up

export const CreateStaffResolver = {
  Mutation: {
    createStaff: async (_: unknown, args: { input: any }, ctx: any) => {
      try {
        // Create the staff member
        const staff = await prisma.staff.create({
          data: {
            fullName: args.input.fullName,
            avatar_url: args.input.avatar_url,
            timezone: args.input.timezone,
            isActive: args.input.isActive ?? true,  // Default to true if not provided
          }
        });

        // Create the working hours for the staff member
        const workingHours = await Promise.all(
          args.input.workingHours.map((wh: { day: string, startTime: string, endTime: string }) => {
            return prisma.workingHour.create({
              data: {
                day: wh.day,
                startTime: wh.startTime,
                endTime: wh.endTime,
                staffId: staff.id,  // Associate working hours with the created staff member
              }
            });
          })
        );

        // Return the staff object with the working hours
        return {
          id: staff.id,
          fullName: staff.fullName,
          avatar_url: staff.avatar_url,
          timezone: staff.timezone,
          isActive: staff.isActive,
          workingHours: workingHours,  // Include the working hours in the response
        };

      } catch (error: any) {
        // Handle errors gracefully
        console.error(error);
        throw new Error("Failed to create staff member.");
      }
    }
  }
};
