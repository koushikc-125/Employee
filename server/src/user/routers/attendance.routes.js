import { Router } from "express";
import { verifyJWT } from "../../middleware/auth.middleware.js";
import { checkInUser, getMyAttendance, getAllEmployeeAttendance } from "../controllers/attendance.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/checkin").post(checkInUser);
router.route("/my-logs").get(getMyAttendance);

// Admin only
router.route("/admin/all-logs").get(getAllEmployeeAttendance);

export default router;
