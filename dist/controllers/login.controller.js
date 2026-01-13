"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const argon2_1 = __importDefault(require("argon2"));
const postgreSQL_1 = __importDefault(require("../lib/postgreSQL"));
const LoginController = async (req, res, next) => {
    const body = await req.body;
    const { email, phone, password } = body;
    if (!phone || !password) {
        return new ApiError_1.default(400, "Phone and password are required");
    }
    const rows = await (0, postgreSQL_1.default) `
      SELECT 
        au.id,
        au.passwordHash,
        au.isActive,
        au.lockedAt,
        au.deletedAt
      FROM identifiers i
      JOIN auth_user au ON au.id = i.authId
      WHERE i.type = 'phone'
        AND i.value = ${phone}
        AND i.isActive = TRUE
        AND i.isVerified = TRUE
        AND i.deletedAt IS NULL
      LIMIT 1`;
    if (rows.length === 0) {
        return new ApiError_1.default(401, "Invalid credentials");
    }
    const user = rows[0];
    if (!user.isactive || user.deletedat || user.lockedat) {
        return new ApiError_1.default(403, "Account is not available");
    }
    const isValid = await argon2_1.default.verify(user.passwordHash, password);
    if (!isValid) {
        return new ApiError_1.default(401, "Invalid credentials");
    }
    res.status(200).json({ success: true });
};
exports.LoginController = LoginController;
