import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/userModel.js";
import communityRoutes from './routes/communityRoute.js';
import sponsersRoute from "./routes/sponsersRoute.js";
import registrationRoute from "./routes/registrationRoute.js";
import participentRoute from "./routes/participentRoute.js";
import facultyRoute from "./routes/facultyRoute.js";
import formidable from "express-formidable"; // Import User model
import { requireSignIn, isAdmin} from "./middlewares/authMiddleware.js"; // Import middlewares

// Configure env
dotenv.config();

// Database config
connectDB();

// esmodule fix for dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rest object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/community", communityRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/sponsers", sponsersRoute);
app.use("/api/v1/registration", registrationRoute);
app.use("/api/v1/participent", participentRoute);
app.use("/api/v1/faculty", facultyRoute);
app.use(formidable());

// Route to fetch users' names, emails, and roles
app.get("/api/v1/users", requireSignIn, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "name email role"); // Fetch only 'name', 'email', and 'role'
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

// Route to delete a user by ID
app.delete("/api/v1/users/:id", requireSignIn, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
});

// update routes
app.put("/api/v1/users/:id", requireSignIn, isAdmin, async (req, res) => {
  try {
    const userId = req.params.id; // Extract user ID from the request
    const { role } = req.body; // Extract updated data from the request body
   
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true } // Return the updated document and validate the input
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// static files for frontend
app.use(express.static(path.join(__dirname, "./client/build")));

// handle react routing, return all requests to React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Port
const PORT = process.env.PORT || 8080;

// Run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
