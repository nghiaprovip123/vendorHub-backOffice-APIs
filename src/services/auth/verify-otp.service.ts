import sql from '@/lib/postgresql';
import ApiError from '@/utils/ApiError';
import { jwtService } from '@/lib/jwt/index.jwt';

type VerifyOtpInput = {
  otp: string;
  email: string;
  name?: string;
};

type VerifyOtpResult = {
  accessToken: string;
};

export class OtpAuthService {
  async verifyOtp({
    otp,
    email,
    name,
  }: VerifyOtpInput): Promise<VerifyOtpResult> {
    const [otpRow] = await sql`
      SELECT id
      FROM otps
      WHERE otp = ${otp}
        AND email = ${email}
        AND isverified = false
        AND isactive = true
        AND expiresat > NOW()
    `;

    if (!otpRow) {
      throw new ApiError(400, 'OTP KHÔNG HỢP LỆ');
    }

    // 2. Check existing user by email
    const [existing] = await sql`
      SELECT authid
      FROM identifiers
      WHERE type = 'email'
        AND value = ${email}
        AND isactive = true
    `;

    let authUserId: string;

    if (existing?.authid) {
      authUserId = existing.authid;
    } else {
      const [{ id }] = await sql`
        INSERT INTO auth_user (name, isactive)
        VALUES (${name ?? null}, true)
        RETURNING id
      `;

      authUserId = id;

      await sql`
        INSERT INTO identifiers (
          authid,
          type,
          value,
          isverified,
          isactive
        )
        VALUES (
          ${authUserId},
          'email',
          ${email},
          true,
          true
        )
      `;
    }

    await sql`
      UPDATE otps
      SET isverified = true,
          isactive = false,
          verifiedat = NOW()
      WHERE id = ${otpRow.id}
    `;

    const accessToken = jwtService.generateAccessToken(
      {
        sub: authUserId,
        email,
        jti: jwtService.generateJit(),
      },
      300 
    );

    return { accessToken };
  }
}

export const otpAuthService = new OtpAuthService();
