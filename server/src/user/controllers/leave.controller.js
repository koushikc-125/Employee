import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Leave } from "../model/leave.model.js";

export const applyForLeave = asyncHandler(async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;

  if (!leaveType || !startDate || !endDate) {
    throw new ApiError(400, "Missing required leave parameters");
  }

  const leaveRequest = await Leave.create({
    user: req.user._id,
    leaveType,
    startDate,
    endDate,
    reason,
  });

  return res.status(201).json(new ApiResponse(201, leaveRequest, "Leave request submitted"));
});

export const getMyLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find({ user: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, leaves, "Your leaves fetched"));
});

// Admin-only route: Approve/Reject requests
export const updateLeaveStatus = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Admins only");
  }

  const { leaveId, status } = req.body; // status: "Approved" or "Rejected"
  
  const leave = await Leave.findByIdAndUpdate(
    leaveId,
    { $set: { status, approvedBy: req.user._id } },
    { new: true }
  );

  if (!leave) throw new ApiError(404, "Leave request not found");

  return res.status(200).json(new ApiResponse(200, leave, `Leave status updated to ${status}`));
});
