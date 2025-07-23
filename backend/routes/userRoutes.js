import express from 'express'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  deleteUserController,
  updateUserController
} from "../controllers/userController";

const router = express.Router();

// Get all users (admin only)
router.get("/users",  requireSignIn, isAdmin, async (req, res) => {
  try {
    const users = await userModel.find({}, "name email role"); // Fetch specific fields
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

// Update user route (admin only)
router.put("/users/:id", requireSignIn, isAdmin, updateUserController);

// Delete user route (admin only)
router.delete("/users/:id", requireSignIn, isAdmin, deleteUserController);

export default router;