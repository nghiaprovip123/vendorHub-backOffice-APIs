import express from "express";
import router  from "@/route/auth/auth.route"
import ProductVariantRouter from '@/route/product-variant/productVariant.route'
import CategoryRoute from '@/route/category/category.route'
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/error.middleware"
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
// Middleware để parse JSON
app.use(express.json());
app.use(cookieParser())


// Routes
app.use("/auth", router);
app.use("/product-variant", ProductVariantRouter);
app.use("/category-attribute", CategoryRoute)


// Error handler phải đặt cuối cùng
app.use(errorHandler);

// Chạy server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });