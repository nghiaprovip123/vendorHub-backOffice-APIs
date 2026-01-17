import sql from "@/lib/postgresql";
import argon2 from "argon2";
import { IdentifierType } from "@/enums/auth/identifier-type.enum";
import { AuthGuard } from "@/guards/auth.guard";

export class CreatePasswordService {
    async createPassword(params: {
        token: string;
        password: string;
    }) {
        const { token, password } = params;

        const guard = new AuthGuard(token);
        const payload = guard.extractTokenPayload();
        const { sub } = payload;

        const [user] = await sql`
            SELECT * FROM auth_user
            WHERE id = ${sub}
        `;
        if (!user) {
            throw new Error("KHÔNG TÌM THẤY USER");
        }

        const hashPassword = await argon2.hash(password);

        try {
            await sql`
                INSERT INTO identifiers (type, value, isverified, isactive, authid)
                VALUES (
                    ${IdentifierType.PASSWORD},
                    ${hashPassword},
                    true,
                    true,
                    ${sub}
                )
            `;
        } catch (err: any) {
            if (err.code === "23505") {
                throw new Error("PASSWORD ĐÃ TỒN TẠI");
            }
            throw err;
        }

        return user;
    }
}
