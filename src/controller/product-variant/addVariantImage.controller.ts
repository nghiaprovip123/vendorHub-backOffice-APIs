import { Request, Response, NextFunction } from "express";
import  { variantImage }  from "@/services/product-variant/addVariantImage.service"

export const variantImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];

    const controllerResponse =  await variantImage(files)
    
    return res.status(200).json(
        {
            message: "Upload Variant Image Successfully!",
            data: controllerResponse, 
        }
    )
  } catch (error) {
    next(error);  
  }
};
