import express from "express";
import router  from "@/route/auth/auth.route"
import { errorHandler } from "./middlewares/error.middleware";
import dotenv from "dotenv";
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app = express();

// Middleware để parse JSON
app.use(express.json());

// Routes
app.use("/auth", router);

// Error handler phải đặt cuối cùng
app.use(errorHandler);

// Chạy server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });