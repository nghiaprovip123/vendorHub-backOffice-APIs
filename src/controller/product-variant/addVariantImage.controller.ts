import { Request, Response, NextFunction } from "express";
import  { variantImage }  from "@/services/product-variant/addVariantImage.service"

export const variantImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];
    const body = req.body;
    const { variantId }  = body;

    const controllerResponse =  await variantImage(files, variantId)
    
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
