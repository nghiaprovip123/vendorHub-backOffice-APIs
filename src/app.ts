import express, { Express, Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()

app.use(helmet())
app.use(compression())
app.use(cors({
  origin: "*",
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/vendorhub", (_req: Request, res: Response) => {
  res.json({ status: "ok" })
})

app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "VendorHub API",
    status: "running",
    env: process.env.NODE_ENV,
  })
})

const PORT = Number(process.env.PORT) || 8080

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
})
