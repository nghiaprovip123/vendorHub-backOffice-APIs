import { Request, Response, NextFunction } from "express";
import cloudinary from "@/utils/cloudinaryConfig";
import streamifier from "streamifier";

export const variantImageController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File is required!" });
    }

    const stream = streamifier.createReadStream(file.buffer);

    const cloudinaryStream = cloudinary.uploader.upload_stream(
      {
        folder: "variants",  
        resource_type: "image",  
      },
      (error, result) => {
        if (error) {
          return next(error);  
        }

        if (!result) {
          return res.status(500).json({ message: "Failed to upload image" });
        }

        return res.status(200).json({
          message: "Upload Successfully Variant Image!",
          url: result.secure_url,  
          public_id: result.public_id,  
        });
      }
    );

    stream.pipe(cloudinaryStream);

  } catch (error) {
    next(error);  // Forward any unexpected error to error handler
  }
};
