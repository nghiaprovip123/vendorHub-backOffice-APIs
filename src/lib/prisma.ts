// lib/prisma.ts

import { PrismaClient } from '@prisma/client'

// 1. Khai báo biến global.
// Điều này là để TypeScript nhận biết biến globalThis có chứa prisma.
// Biến này chỉ tồn tại trong môi trường phát triển (development).
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

// 2. Khởi tạo client.
// Kiểm tra nếu đã tồn tại client trong biến globalForPrisma thì dùng lại.
// Nếu chưa, tạo client mới.
export const prisma = 
  globalForPrisma.prisma ??
  new PrismaClient({
    // Tùy chọn: Bật log để thấy các query được gửi đi
    log: 
      process.env.NODE_ENV === 'development' 
        ? ['query', 'error', 'warn'] 
        : ['error'],
  })

// 3. Gán client mới tạo vào biến global.
// Chỉ thực hiện điều này trong môi trường phát triển (development)
// để tránh việc tạo lại client khi hot-reloading.
if (process.env.NODE_ENV !== 'production') 
  globalForPrisma.prisma = prisma