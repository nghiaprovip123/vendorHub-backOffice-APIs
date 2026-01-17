import { jwtService } from "@/lib/jwt/index.jwt"

export class AuthGuard {
    constructor(private readonly token: string) {
        if (!token) {
            throw new Error("THIẾU THÔNG TIN TOKEN");
        }
    }

    verifyToken() {
        const decoded = jwtService.verifyAccessToken(this.token);
        if (!decoded) {
            throw new Error('SAI TOKEN, VUI LÒNG THỬ LẠI');
        }
        return decoded;
    }

    extractTokenPayload() {
        const payload = this.verifyToken();
        if (!payload) {
            throw new Error("KHÔNG TỒN TẠI TOKEN PAYLOAD");
        }
        return payload;
    }
}
