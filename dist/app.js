"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./route/auth/auth.route"));
const error_middleware_1 = require("./middlewares/error.middleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = 3000;
const app = (0, express_1.default)();
// Middleware để parse JSON
app.use(express_1.default.json());
// Routes
app.use("/auth", auth_route_1.default);
// Error handler phải đặt cuối cùng
app.use(error_middleware_1.errorHandler);
// Chạy server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
