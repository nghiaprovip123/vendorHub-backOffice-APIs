import { Request, Response, NextFunction } from 'express';
import ApiError from '@/utils/ApiError';
import { otpAuthService } from '@/services/auth/verify-otp.service';

export const VerifyOTPController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp, email, name } = req.body;

    if (!otp || !email) {
      throw new ApiError(400, 'OTP VÀ EMAIL LÀ BẮT BUỘC');
    }

    const { accessToken } = await otpAuthService.verifyOtp({
      otp,
      email,
      name,
    });

    return res.json({
      success: true,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};
