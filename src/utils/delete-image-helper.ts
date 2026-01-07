import { v2 as cloudinary } from "cloudinary"
import { UploadApiResponse } from "cloudinary"

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
    }
)

export const deleteAssetFromCloudinary = (
    public_id: string
  ): Promise<{ result: string }> => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(public_id, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }
  