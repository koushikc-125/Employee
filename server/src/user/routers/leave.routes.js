import { Router } from "express";
import { verifyJWT } from "../../middleware/auth.middleware.js";
import { applyForLeave, getMyLeaves, updateLeaveStatus } from "../controllers/leave.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/apply").post(applyForLeave);
router.route("/my-requests").get(getMyLeaves);

// Admin only
router.route("/admin/review").patch(updateLeaveStatus);

export default router;
