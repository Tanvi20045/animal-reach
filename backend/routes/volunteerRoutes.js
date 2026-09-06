import express from "express";
import { registerVolunteer, getVolunteers } from "../controllers/volunteerController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/")
  .get(getVolunteers)
  .post(protect, registerVolunteer);

export default router;
