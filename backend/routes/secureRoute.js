import express from "express";
import multer from "multer";
import fs from "fs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import path from "path";
import{
  getAllFiles,
   uploadFile,
   deleteFile,
   getFileById
} from "../controllers/secureController.js";

const router = express.Router();

let currentOTP = null; // store OTP temporarily (better use DB/Redis in prod)

// send OTP
router.post("/send-otp", async (req, res) => {
  try {
    currentOTP = crypto.randomInt(100000, 999999).toString(); // 6 digit OTP

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "prateekagrawal589@gmail.com", // your gmail
        pass: "evqxuyjpxfuhcati", // app password
      },
    });

    await transporter.sendMail({
      from: "prateekagrawal589@gmail.com",
      to: "prateekagrawal120@gmail.com", // change to your email
      subject: "Verification Code",
      text: `Your verification code is: ${currentOTP}`,
    });

    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// verify OTP
router.post("/verify-otp", (req, res) => {
  const { code } = req.body;
  if (code === currentOTP) {
    currentOTP = null; // clear after use
    return res.json({ success: true });
  }
  res.status(400).json({ success: false, message: "Invalid code" });
});


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'video/mp4',
    'audio/mp3',
    'application/pdf',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, videos, audio, PDF, DOC, DOCX, and TXT files are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Routes

// Get all files
router.get('/files', getAllFiles);

router.get("/files/:id", getFileById);  

// Upload file
router.post('/upload', upload.single('file'), uploadFile);

// Delete file
router.delete('/:id', deleteFile);

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 100MB.'
      });
    }
  }
  
  if (error.message === 'Invalid file type. Only images, videos, audio, PDF, DOC, DOCX, and TXT files are allowed.') {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.status(500).json({
    success: false,
    message: 'File upload error occurred.'
  });
});

export default router;
