import { JwtService } from "@/lib/jwt/jwt.service";

export const jwtService = new JwtService({
    privateKey: process.env.JWT_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    publicKey: process.env.JWT_PUBLIC_KEY!.replace(/\\n/g, "\n"),
    algorithm: "RS256",
  });
  