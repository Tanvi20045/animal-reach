import express from "express";
import { createRescue, getRescues, updateRescueStatus } from "../controllers/rescueController.js";
import { protect, authorize } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.route("/")
  .get(protect, getRescues)
  .post(protect, upload.array("images", 4), createRescue);

router.put("/:id/status", protect, authorize("volunteer", "admin"), updateRescueStatus);

export default router;
