import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { UserInfoOptions } from "os";

type GoogleAuthInput = {
    code: string;
};

type GoogleTokenResponse = {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    scope: string;
    token_type: string;
    id_token?: string;
  };

type UserInfoType = {
    email: string;
    password: string;
    userName: string;
}

export const googleAuth = async ({ code }: GoogleAuthInput) => {
    if (!code) {
        throw new Error("Authorization code not found");
    }

    const tokenResponse = await fetch(
        "https://oauth2.googleapis.com/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                code,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
                grant_type: "authorization_code",
            }),
        }
    );

    const tokenData = (await tokenResponse.json()) as GoogleTokenResponse

    if (!tokenData.access_token) {
        throw new Error("Failed to fetch Google access token");
    }

    const userRes = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        }
    );

    const userInfo = await (userRes.json()) as UserInfoType;

    if (!userInfo.email) {
        throw new Error("Failed to fetch Google access token");
    }
    
    let user = await prisma.user.findUnique({
        where: { email: userInfo.email },
    });

    if (!user) {
        user = await prisma.user.create({
          data: {
            email: userInfo.email,
            name: userInfo.userName ?? "",
            password: "", 
          },
        });
    }

    const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
      );
  
      const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );
    
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });

    return { refreshToken, accessToken }
}
