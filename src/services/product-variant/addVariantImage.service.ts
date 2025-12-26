import cloudinary from "@/utils/cloudinaryConfig";
import streamifier from "streamifier";
import ApiError from "@/utils/ApiError";

export const variantImage = (
  file: Express.Multer.File[] | undefined
): Promise<{ url: string; public_id: string }[]> => {
  if (!file) {
    throw new ApiError(400, "File is required!");
  }

  // Using map to handle multiple files, if necessary
  return Promise.all(
    file.map((c) => {
      return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "variants",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              return reject(new ApiError(500, "Upload to Cloudinary Failed!"));
            }

            if (!result) {
              return reject(new ApiError(500, "No Result from Cloudinary"));
            }

            resolve({
              url: result.secure_url,
              public_id: result.public_id,
            });
          }
        );

        // Convert buffer to a readable stream and pipe to Cloudinary's upload stream
        streamifier.createReadStream(c.buffer).pipe(uploadStream);
      });
    })
  );
};
