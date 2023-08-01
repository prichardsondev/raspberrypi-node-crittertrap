require('dotenv').config();

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const uploadToCloudinary = async (image) => {
    let result = await cloudinary.v2.uploader.upload(image,
        { public_id: "test" });

    return result;
};

exports.uploadToCloudinary = uploadToCloudinary;
