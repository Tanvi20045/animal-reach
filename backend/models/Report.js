import mongoose from "mongoose";

// A "Report" is a street-animal sighting: injured, stray, in danger, etc.
const reportSchema = new mongoose.Schema(
  {
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    animalType: { type: String, enum: ["Dog", "Cat", "Cow", "Bird", "Other"], required: true },
    condition: {
      type: String,
      enum: ["Injured", "Sick", "Healthy - needs shelter", "Aggressive", "Deceased"],
      required: true,
    },
    description: { type: String, required: true, trim: true },
    images: [{ type: String }],
    location: {
      address: { type: String, required: true },
      lat: { type: Number },
      lng: { type: Number },
    },
    status: {
      type: String,
      enum: ["Pending", "Acknowledged", "Rescue Dispatched", "Resolved"],
      default: "Pending",
    },
    assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    urgent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
