import express from "express";
import {
  createListing,
  getListings,
  getListingById,
  applyToAdopt,
} from "../controllers/adoptionController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.route("/")
  .get(getListings)
  .post(protect, upload.array("images", 5), createListing);

router.get("/:id", getListingById);
router.post("/:id/apply", protect, applyToAdopt);

export default router;
