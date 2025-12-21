import express from "express";
import router  from "@/route/auth/auth.route"
import { errorHandler } from "./middlewares/error.middleware";
import dotenv from "dotenv";
dotenv.config();

const PORT = 3000;
const app = express();

// Middleware để parse JSON
app.use(express.json());

// Routes
app.use("/auth", router);

// Error handler phải đặt cuối cùng
app.use(errorHandler);

// Chạy server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});