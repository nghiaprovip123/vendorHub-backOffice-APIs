import argon2 from 'argon2';
import sql from '@/lib/postgresql';
import ApiError from '@/utils/ApiError';
import { IdentifierType } from '@/enums/auth/identifier-type.enum';
import { jwtService } from '@/lib/jwt/index.jwt';

type LoginInput = {
  email: string;
  password: string;
  userAgent: string;
};

type LoginResult = {
  refreshToken: string;
};

export class LoginService {
  async login({ email, password, userAgent }: LoginInput): Promise<LoginResult> {
    const [identifier] = await sql`
      SELECT authid
      FROM identifiers
      WHERE type = ${IdentifierType.EMAIL}
        AND value = ${email}
    `;

    if (!identifier?.authid) {
      throw new ApiError(403, 'TÀI KHOẢN KHÔNG TỒN TẠI');
    }

    const authid = identifier.authid;

    const [passwordRow] = await sql`
      SELECT value
      FROM identifiers
      WHERE authid = ${authid}
        AND type = ${IdentifierType.PASSWORD}
    `;

    if (!passwordRow?.value) {
      throw new ApiError(500, 'PASSWORD IDENTIFIER NOT FOUND');
    }

    const isValid = await argon2.verify(passwordRow.value, password);

    if (!isValid) {
      throw new ApiError(401, 'KHÔNG ĐÚNG THÔNG TIN ĐĂNG NHẬP');
    }

    const refreshToken = await jwtService.generateRefreshToken(
      {
        sub: authid,
        email,
        jti: jwtService.generateJit(),
      },
      604800 
    );

    const refreshTokenHash = await argon2.hash(refreshToken);

    await sql`
      INSERT INTO refresh_token_sessions (
        authid,
        refreshtokenhash,
        expiresat,
        sessionid,
        useragent
      )
      VALUES (
        ${authid},
        ${refreshTokenHash},
        NOW() + INTERVAL '7d',
        gen_random_uuid(),
        ${userAgent}
      )
    `;

    return { refreshToken };
  }
}

export const authService = new LoginService();
