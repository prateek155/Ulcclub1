import feedbackModel from "../models/feedbackModel.js";
import userModel from "../models/userModel.js";

// Submit new feedback
export const createFeedback = async (req, res) => {
  try {
    const { subject, message } = req.body;
    
    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Subject and message are required",
      });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const feedback = new feedbackModel({
      userId: user._id,
      userName: user.name,
      userRole: user.role,
      subject,
      message,
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in submitting feedback",
      error: error.message,
    });
  }
};

// Get all feedback for admin
export const getAllFeedback = async (req, res) => {
  try {
    const { status, priority, sort = "-createdAt" } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    console.log("Query:", query); // Debug query

    const feedback = await feedbackModel
      .find(query)
      .sort(sort)
      .populate("userId", "name email");
      console.log("Feedback Retrieved:", feedback); // Debug feedback

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback,
    });
  } catch (error) {
    console.error("Error Details:", error); // Log detailed error
    res.status(500).json({
      success: false,
      message: "Error in getting feedback",
      error: error.message,
    });
  }
};

// Get user's feedback
export const getUserFeedback = async (req, res) => {
  try {
    const feedback = await feedbackModel
      .find({ userId: req.user._id })
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting user feedback",
      error: error.message,
    });
  }
};

// Update feedback status
export const updateFeedbackStatus = async (req, res) => {
  try {
    const { status, response } = req.body;
    
    const feedback = await feedbackModel.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        response,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback updated successfully",
      feedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in updating feedback",
      error: error.message,
    });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await feedbackModel.findByIdAndDelete(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting feedback",
      error: error.message,
    });
  }
};