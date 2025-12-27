"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantImage = void 0;
const cloudinaryConfig_1 = __importDefault(require("../../utils/cloudinaryConfig"));
const streamifier_1 = __importDefault(require("streamifier"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const prisma_1 = require("../../lib/prisma");
const variantImage = async (files, variantId) => {
    if (!files || files.length === 0) {
        throw new ApiError_1.default(400, "Files are required!");
    }
    const uploadResults = await Promise.all(files.map((file) => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinaryConfig_1.default.uploader.upload_stream({
                folder: "variants",
                resource_type: "image",
            }, (error, result) => {
                if (error || !result) {
                    return reject(new ApiError_1.default(500, "Upload to Cloudinary Failed!"));
                }
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            });
            streamifier_1.default.createReadStream(file.buffer).pipe(uploadStream);
        });
    }));
    await prisma_1.prisma.variantMedia.createMany({
        data: uploadResults.map((img) => ({
            url: img.url,
            variantId: variantId,
        })),
    });
    return uploadResults;
};
exports.variantImage = variantImage;
