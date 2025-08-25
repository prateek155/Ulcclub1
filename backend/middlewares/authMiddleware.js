import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes (Token-based authentication)
export const requireSignIn = async (req, res, next) => {
  try {
    // Check if the token is present in the request headers
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authorization token is missing",
      });
    }

    // Verify the token and decode the user data
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    console.error("Error in requireSignIn middleware:", error);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// User Access Middleware
export const isUser = async (req, res, next) => {
  try {
    // Fetch user information from the database using the decoded token
    const user = await userModel.findById(req.user._id);

    // Check if the user role is a normal user (role: 0)
    if (!user || user.role !== 0) {
      return res.status(403).send({
        success: false,
        message: "User access required",
      });
    }

    next();
  } catch (error) {
    console.error("Error in isUser middleware:", error);
    return res.status(500).send({
      success: false,
      message: "Error in user middleware",
      error,
    });
  }
};


// Admin Access Middleware
export const isAdmin = async (req, res, next) => {
  try {
    // Fetch user information from the database using the decoded token
    const user = await userModel.findById(req.user._id);

    // Check if the user role is admin
    if (!user || user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    return res.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};



