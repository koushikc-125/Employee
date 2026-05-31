import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Speeds up lookups when fetching history
    },
    date: {
      type: String, // Storing as 'YYYY-MM-DD' makes daily querying super easy
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late", "Half-Day"],
      default: "Present",
    },
    locationMocked: {
      type: Boolean,
      default: false, // For your "timemock" screen flags
    }
  },
  { timestamps: true }
);

// Prevent duplicate logs for the same user on the same day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model("Attendance", attendanceSchema);
