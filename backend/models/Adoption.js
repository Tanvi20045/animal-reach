import mongoose from "mongoose";

// An adoption LISTING (an animal available to adopt)
const adoptionSchema = new mongoose.Schema(
  {
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    species: { type: String, enum: ["Dog", "Cat", "Other"], required: true },
    breed: { type: String, default: "Indie / Mixed" },
    age: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Unknown"], default: "Unknown" },
    size: { type: String, enum: ["Small", "Medium", "Large"], default: "Medium" },
    vaccinated: { type: Boolean, default: false },
    sterilized: { type: Boolean, default: false },
    temperament: [{ type: String }],
    description: { type: String, required: true },
    images: [{ type: String }],
    location: { type: String, required: true },
    status: { type: String, enum: ["Available", "Pending", "Adopted"], default: "Available" },
  },
  { timestamps: true }
);

// Applications submitted by users wanting to adopt a specific listing
const adoptionApplicationSchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Adoption", required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    contactPhone: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  },
  { timestamps: true }
);

export const AdoptionApplication = mongoose.model("AdoptionApplication", adoptionApplicationSchema);
export default mongoose.model("Adoption", adoptionSchema);
