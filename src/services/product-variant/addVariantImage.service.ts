import cloudinary from "@/utils/cloudinaryConfig";
import streamifier from "streamifier";
import ApiError from "@/utils/ApiError";
import { prisma } from "@/lib/prisma";

export const variantImage = async (
  files: Express.Multer.File[] | undefined,
  variantId: string 
): Promise<{ url: string; public_id: string }[]> => {
  
  if (!files || files.length === 0) {
    throw new ApiError(400, "Files are required!");
  }

  const uploadResults = await Promise.all(
    files.map((file) => {
      return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "variants",
            resource_type: "image",
          },
          (error, result) => {
            if (error || !result) {
              return reject(new ApiError(500, "Upload to Cloudinary Failed!"));
            }
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
            });
          }
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    })
  );

  await prisma.variantMedia.createMany({
    data: uploadResults.map((img) => ({
      url: img.url,
      variantId: variantId, 
    })),
  });

  return uploadResults;
};