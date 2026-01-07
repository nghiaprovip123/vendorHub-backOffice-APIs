// resolvers/staff.resolver.ts
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/utils/upload-helper";
import { GraphQLUpload } from 'graphql-upload-minimal';
import { createStaffService } from '@/services/staffs/create-staff.service'

const createStaff = async(
  _: unknown,
  args: { input: any },
  ctx: any
) => {
  try {
    const createStaff = await createStaffService(args.input)
    return createStaff;
  } catch (error: any) {
    console.error("Error creating staff:", error);
    throw new Error(error.message || "Failed to create staff");
  }
}

export const CreateStaff = {
  Upload: GraphQLUpload, 
  Mutation: {
    createStaff
  }
};