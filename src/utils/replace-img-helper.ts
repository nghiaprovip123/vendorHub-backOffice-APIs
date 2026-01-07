import { v2 as cloudinary } from "cloudinary"
import { UploadApiResponse } from "cloudinary"
// rqvosutgecru7tutqcdu
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export const replaceImageOnCloudinary = (
  stream: NodeJS.ReadableStream,
  folder: string,
  public_id: string,
  overwrite: boolean
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        overwrite,
        public_id,
        folder,
        resource_type: "image"
      }, (error, result) => {
        if (error) {
          throw new Error("Fail to upload image")
        }
        resolve(result!)
      }
    )
    stream.pipe(uploadStream)
  })
}
