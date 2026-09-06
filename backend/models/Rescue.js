import mongoose from "mongoose";

// A rescue request escalated from a Report, or raised directly for emergencies
const rescueSchema = new mongoose.Schema(
  {
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    relatedReport: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
    animalType: { type: String, required: true },
    emergencyLevel: { type: String, enum: ["Low", "Medium", "Critical"], default: "Medium" },
    description: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      lat: Number,
      lng: Number,
    },
    contactPhone: { type: String, required: true },
    status: {
      type: String,
      enum: ["Requested", "Volunteer Assigned", "In Progress", "Rescued", "Closed"],
      default: "Requested",
    },
    assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Rescue", rescueSchema);
