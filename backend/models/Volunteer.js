import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skills: [{ type: String }], // e.g. "Rescue driving", "First aid", "Fostering"
    availability: { type: String, enum: ["Weekdays", "Weekends", "Flexible"], default: "Flexible" },
    city: { type: String, required: true },
    hasVehicle: { type: Boolean, default: false },
    bio: { type: String },
    status: { type: String, enum: ["Pending", "Active", "Inactive"], default: "Pending" },
    rescuesCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Volunteer", volunteerSchema);
