import cloudinary from "@/utils/cloudinaryConfig"
import streamifier from "streamifier"
import ApiError from "@/utils/ApiError"

export const variantImage = (
  file: Express.Multer.File | undefined
): Promise<{ url: string; public_id: string }> => {
  if (!file) {
    throw new ApiError(400, "File is required")
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "variants",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(
            new ApiError(500, "Upload to Cloudinary failed")
          )
        }

        if (!result) {
          return reject(
            new ApiError(500, "No result from Cloudinary")
          )
        }

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        })
      }
    )

    streamifier.createReadStream(file.buffer).pipe(uploadStream)
  })
}
