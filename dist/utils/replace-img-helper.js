"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceImageOnCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
// rqvosutgecru7tutqcdu
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const replaceImageOnCloudinary = (stream, folder, public_id, overwrite) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            overwrite,
            public_id,
            folder,
            resource_type: "image"
        }, (error, result) => {
            if (error) {
                throw new Error("Fail to upload image");
            }
            resolve(result);
        });
        stream.pipe(uploadStream);
    });
};
exports.replaceImageOnCloudinary = replaceImageOnCloudinary;
