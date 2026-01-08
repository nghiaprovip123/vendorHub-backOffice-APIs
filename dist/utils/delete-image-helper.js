"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssetFromCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const deleteAssetFromCloudinary = (public_id) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.destroy(public_id, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};
exports.deleteAssetFromCloudinary = deleteAssetFromCloudinary;
