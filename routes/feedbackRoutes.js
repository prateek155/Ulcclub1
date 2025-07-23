// routes/feedbackRoutes.js
import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createFeedback,
  getAllFeedback,
  getUserFeedback,
  updateFeedbackStatus,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

// User routes
router.post("/create", requireSignIn, createFeedback); // Any authenticated user can create
router.get("/user-feedback", requireSignIn, getUserFeedback); // Any authenticated user can view their own

// Admin and President routes
router.get("/all", requireSignIn, isAdmin, getAllFeedback); // Only admin and president can see all
router.put("/update-status/:id", requireSignIn, isAdmin, updateFeedbackStatus); // Only admin and president can update
router.delete("/delete/:id", requireSignIn, isAdmin, deleteFeedback); // Only admin and president can delete

export default router;