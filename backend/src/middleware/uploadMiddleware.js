const multer = require("multer");
const path = require("path");

// Configure where and how files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Files will be stored in src/uploads/
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // Generate a unique filename: timestamp + original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File validation filter
const fileFilter = (req, file, cb) => {
  // Allowed file extensions
  const allowedTypes = /jpeg|jpg|png|pdf/;
  
  // Check extension name and mime type
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, .jpeg, and .pdf files are allowed!"), false);
  }
};

// Initialize multer middleware configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB maximum file size limit
  },
  fileFilter: fileFilter,
});

module.exports = upload;