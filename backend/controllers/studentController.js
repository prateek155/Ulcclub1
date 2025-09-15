import studentModel from "../models/studentModel.js";
import multer from "multer";
import path from "path";
// Configure multer for file uploads
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/students/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'student-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// @desc    Get all students
// @route   GET /api/students
// @access  Public
export const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, class: className, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const query = {};
    if (className) {
      query.class = className;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 }
    };

    const students = await studentModel.find(query)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit);

    const total = await studentModel.countDocuments(query);

    res.status(200).json({
      success: true,
      data: students,
      pagination: {
        page: options.page,
        limit: options.limit,
        total,
        pages: Math.ceil(total / options.limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Public
export const getStudentById = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'studentModel not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'studentModel not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Public
export const createStudent = async (req, res) => {
  try {
    const { name, class: className, photo, complaints = [] } = req.body;

    // Validation
    if (!name || !className) {
      return res.status(400).json({
        success: false,
        message: 'Name and class are required'
      });
    }

    // Create student object
    const studentData = {
      name: name.trim(),
      class: className.trim(),
      photo: photo || (req.file ? req.file.path : null),
      complaints: complaints.map(complaint => ({ text: complaint }))
    };

    const student = await studentModel.create(studentData);

    res.status(201).json({
      success: true,
      data: student,
      message: 'studentModel created successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Public
export const updateStudent = async (req, res) => {
  try {
    const { name, class: className, photo, complaints } = req.body;

    const student = await studentModel.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'studentModel not found'
      });
    }

    // Update fields
    if (name) student.name = name.trim();
    if (className) student.class = className.trim();
    if (photo) student.photo = photo;
    if (req.file) student.photo = req.file.path;
    if (complaints) {
      student.complaints = complaints.map(complaint => ({ text: complaint }));
    }

    const updatedStudent = await student.save();

    res.status(200).json({
      success: true,
      data: updatedStudent,
      message: 'studentModel updated successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'studentModel not found'
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Public
export const deleteStudent = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'studentModel not found'
      });
    }

    await studentModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'studentModel deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'studentModel not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Add complaint to student
// @route   POST /api/students/:id/complaints
// @access  Public
export const addComplaint = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Complaint text is required'
      });
    }

    const student = await studentModel.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'studentModel not found'
      });
    }

    await student.addComplaint(text.trim());

    res.status(201).json({
      success: true,
      data: student,
      message: 'Complaint added successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'studentModel not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update complaint
// @route   PUT /api/students/:id/complaints/:complaintId
// @access  Public
export const updateComplaint = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Complaint text is required'
      });
    }

    const student = await studentModel.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'studentModel not found'
      });
    }

    await student.updateComplaint(req.params.complaintId, text.trim());

    res.status(200).json({
      success: true,
      data: student,
      message: 'Complaint updated successfully'
    });
  } catch (error) {
    if (error.message === 'Complaint not found') {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete complaint
// @route   DELETE /api/students/:id/complaints/:complaintId
// @access  Public
export const deleteComplaint = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await student.removeComplaint(req.params.complaintId);

    res.status(200).json({
      success: true,
      data: student,
      message: 'Complaint deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

