import { Request, Response, NextFunction } from "express"
import { SendOTPService } from "@/services/auth/send-otp.service"
type SendOTPControllerType = {
    phone: string,
    type: string
}
export const SendOTPController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, type, email} = req.body;
  
        const result = await SendOTPService({phone, type, email});

        return res.json({
          success: true,
          otp: result.otp,
          expiresAt: result.expiresAt,
          remaining: result.remainingAttempts
        });
    }
    catch(err){
        next(err)
    }
  }
  