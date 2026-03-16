import { Router } from "express";
import {
  findUser,
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../../middleware/auth.middleware.js";

const router = Router();

router
  .route("/checkUser")
  .post(findUser)
router
  .route("/register")
  .post(registerUser);
router
  .route("/login")
  .post(loginUser);
router
  .route("/refreshAccessToken")
  .post(refreshAccessToken);

//Secured routes
router
  .route("/logout")
  .post(verifyJWT, logoutUser);

router
  .route("/me")
  .post(verifyJWT, getCurrentUser);



export default router;
