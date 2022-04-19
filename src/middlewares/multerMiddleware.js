const path = require('path');
const multer = require('multer');

// ****** inicio de multer *******
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/images/avatars"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const uploadFile = multer({ storage });

module.exports = uploadFile;