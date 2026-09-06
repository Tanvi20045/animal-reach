import express from "express";
import {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
} from "../controllers/reportController.js";
import { protect, authorize } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.route("/")
  .get(getReports)
  .post(protect, upload.array("images", 4), createReport);

router.get("/:id", getReportById);
router.put("/:id/status", protect, authorize("volunteer", "admin"), updateReportStatus);

export default router;
