import secureModel from "../models/secureModel.js";
import fs from "fs";

// Get all files
export const getAllFiles = async (req, res) => {
  try {
    const files = await secureModel.find().sort({ uploadedAt: -1 });
    
    res.json({
      success: true,
      files: files
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch files'
    });
  }
};

// Upload file
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileData = {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype,
      uploadedAt: new Date()
    };

    const file = new secureModel(fileData);
    await file.save();

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      file: file
    });

  } catch (error) {
    console.error('Error uploading file:', error);

    // Clean up uploaded file if DB save fails
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to upload file'
    });
  }
};

// Get specific file by ID
export const getFileById = async (req, res) => {
  try {
    const file = await secureModel.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    res.json({
      success: true,
      file
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch file'
    });
  }
};

// Delete file
export const deleteFile = async (req, res) => {
  try {
    const file = await secureModel.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Delete file from disk
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // Delete from database
    await secureModel.findByIdAndDelete(req.params.id);

    // Clean up any verification codes
    verificationCodes.delete(file._id.toString());
    verificationCodes.delete(`access_${file._id.toString()}`);

    res.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file'
    });
  }
};
