import asyncHandler from "express-async-handler";
import Report from "../models/Report.js";
import User from "../models/User.js";

// @desc Create a street-animal sighting report
// @route POST /api/reports
export const createReport = asyncHandler(async (req, res) => {
  const { animalType, condition, description, address, lat, lng, urgent } = req.body;
  const images = (req.files || []).map((f) => f.path);

  const report = await Report.create({
    reportedBy: req.user._id,
    animalType,
    condition,
    description,
    images,
    location: { address, lat, lng },
    urgent: urgent === "true" || urgent === true,
  });

  // Reward the reporter with impact points
  await User.findByIdAndUpdate(req.user._id, { $inc: { points: 10 } });

  res.status(201).json(report);
});

// @desc Get all reports (filterable by status/city)
// @route GET /api/reports
export const getReports = asyncHandler(async (req, res) => {
  const { status, urgent } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (urgent) filter.urgent = urgent === "true";

  const reports = await Report.find(filter)
    .populate("reportedBy", "name")
    .populate("assignedVolunteer", "name")
    .sort("-createdAt");

  res.json(reports);
});

// @desc Get single report
// @route GET /api/reports/:id
export const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)
    .populate("reportedBy", "name email")
    .populate("assignedVolunteer", "name phone");

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }
  res.json(report);
});

// @desc Update report status (volunteer/admin)
// @route PUT /api/reports/:id/status
export const updateReportStatus = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  report.status = req.body.status || report.status;
  if (req.body.assignedVolunteer) report.assignedVolunteer = req.body.assignedVolunteer;

  const updated = await report.save();
  res.json(updated);
});
