import multer from "multer";


// Configure storage settings for multer
const storage = multer.diskStorage({

    // Specify the destination directory where uploaded files will be stored
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    // Specify the filename for the uploaded file
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
    
})

// Create a multer middleware instance with the specified storage configuration
export const upload = multer({ storage })