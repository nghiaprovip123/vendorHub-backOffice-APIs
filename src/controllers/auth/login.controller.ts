import { Request, Response, NextFunction } from 'express';
import ApiError from '@/utils/ApiError';
import { authService } from '@/services/auth/login.service';
import { optionsCookie } from '@/lib/cookie';

export const LoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent'] ?? 'unknown';

    if (!email || !password) {
      throw new ApiError(400, 'CÁC THÔNG TIN ĐĂNG NHẬP LÀ BẮT BUỘC');
    }

    const { refreshToken } = await authService.login({
      email,
      password,
      userAgent,
    });

    res.cookie('refreshToken', refreshToken, optionsCookie);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
