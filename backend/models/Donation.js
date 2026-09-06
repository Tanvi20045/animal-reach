import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    donorName: { type: String, required: true },
    donorEmail: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 },
    purpose: {
      type: String,
      enum: ["General Fund", "Medical Aid", "Food & Shelter", "Sterilization Drive"],
      default: "General Fund",
    },
    message: { type: String },
    paymentId: { type: String }, // Razorpay/Stripe payment reference
    orderId: { type: String },
    status: { type: String, enum: ["Created", "Success", "Failed"], default: "Created" },
    anonymous: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
