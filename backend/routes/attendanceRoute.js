import express from "express";
import {
  createOrUpdateAttendance,
  getAttendanceByDate,
  getMonthlyAttendance,
  toggleAttendanceLock,
  getMemberStats,
  getAttendanceSummary,
} from "../controllers/attendanceController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();

// ✅ Create or Update attendance for a specific date
router.post("/add-attendance", requireSignIn, isAdmin, createOrUpdateAttendance);

// ✅ Get attendance for a specific date
router.get("/date/:date", requireSignIn, getAttendanceByDate);

// ✅ Get monthly attendance
router.get("/month/:month/:year", getMonthlyAttendance);

// ✅ Lock or unlock attendance
router.post("/lock-toggle", requireSignIn, isAdmin, toggleAttendanceLock);

// ✅ Get stats for a specific member (with optional startDate & endDate in query)
router.get("/member/:memberName", getMemberStats);

// ✅ Get attendance summary (period = week | month | year)
router.get("/summary", getAttendanceSummary);

export default router;





