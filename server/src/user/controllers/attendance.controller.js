import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Attendance } from "../model/attendance.model.js";

// Users check-in for the day
export const checkInUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const todayStr = new Date().toISOString().split("T")[0];

  const existingRecord = await Attendance.findOne({ user: userId, date: todayStr });
  if (existingRecord) {
    throw new ApiError(400, "You have already checked in for today");
  }

  const record = await Attendance.create({
    user: userId,
    date: todayStr,
    checkIn: new Date(),
  });

  return res.status(201).json(new ApiResponse(201, record, "Checked in successfully"));
});

// Users get their own personal logs
export const getMyAttendance = asyncHandler(async (req, res) => {
  const records = await Attendance.find({ user: req.user._id }).sort({ date: -1 });
  return res.status(200).json(new ApiResponse(200, records, "Attendance fetched"));
});

// Admin-only route: See records for EVERY employee
export const getAllEmployeeAttendance = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access Denied: Admins Only");
  }

  // Populate brings in the employee name and email automatically
  const records = await Attendance.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, records, "All records fetched"));
});
