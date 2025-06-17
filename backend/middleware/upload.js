  const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
//const asyncHandler = require('express-async-handler');

// Configure upload directory
//const uploadDir = 'uploads/';

// Create directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(`[Multer] Destination set to: ${uploadDir}`);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${uniqueSuffix}-${file.originalname}`;
    console.log(`[Multer] Generated filename: ${filename}`);
    cb(null, filename);
  }
});

// File filter configuration
const fileFilter = (req, file, cb) => {
  console.log(`[Multer] Received file: ${file.originalname}, Type: ${file.mimetype}`);
  
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    console.log(`[Multer] File accepted: ${file.originalname}`);
    cb(null, true);
  } else {
    console.log(`[Multer] Rejected file type: ${file.mimetype}`);
    cb(new Error(`Invalid file type: ${file.mimetype}. Only images, PDFs and videos are allowed.`), false);
  }
};

// Configure multer
// Add this to your multer config for debugging
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }
}).single('portfolio_asset'); // Explicitly declare single file upload


module.exports = upload;