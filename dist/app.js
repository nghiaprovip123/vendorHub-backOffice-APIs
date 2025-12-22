"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./route/auth/auth.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("./middlewares/error.middleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 3000;
const app = (0, express_1.default)();
// Middleware để parse JSON
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use("/auth", auth_route_1.default);
// Error handler phải đặt cuối cùng
app.use(error_middleware_1.errorHandler);
// Chạy server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
