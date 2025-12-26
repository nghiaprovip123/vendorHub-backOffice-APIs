import { Request, Response, NextFunction } from "express";
import cloudinary from "@/utils/cloudinaryConfig";
import streamifier from "streamifier";
import  { variantImage }  from "@/services/product-variant/addVariantImage.service"
export const variantImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    
    const controllerResponse =  await variantImage(file)
    
    return res.status(200).json(
        {
            message: "Upload Variant Image Successfully!",
            data: controllerResponse, // Send back the URL and public_id or any other response from Cloudinary
        }
    )
  } catch (error) {
    next(error);  // Forward any unexpected error to error handler
  }
};
