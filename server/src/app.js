import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

import healthcheckRouter from "./healthCheck/routes/healthcheck.routes.js";
import userRouter from "./user/routers/user.routers.js"
import attendanceRouter from "./user/routers/attendance.routes.js";
import leaveRouter from "./user/routers/leave.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/leaves", leaveRouter);

app.use(errorHandler)
export default app;
