import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from 'fs'


cloudinary.config({
    cloud_name: 'djhshvtwo',
    api_key: '962837695491772',
    api_secret: 'w5aAhi9IQZYCjHBYbcsrBba4CEM'
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        // file has been successfully uploaded
        console.log("File successfully uploaded", response.url);
        return response;

    } catch (error) {
        console.log("ERROR in file upload on cloudinary")
    }
}

export { uploadOnCloudinary };

