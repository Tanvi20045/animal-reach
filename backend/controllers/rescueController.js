import asyncHandler from "express-async-handler";
import Rescue from "../models/Rescue.js";

// @desc Raise a rescue request
// @route POST /api/rescues
export const createRescue = asyncHandler(async (req, res) => {
  const images = (req.files || []).map((f) => f.path);
  const rescue = await Rescue.create({
    ...req.body,
    location: { address: req.body.address, lat: req.body.lat, lng: req.body.lng },
    requestedBy: req.user._id,
    images,
  });
  res.status(201).json(rescue);
});

// @desc Get rescue requests
// @route GET /api/rescues
export const getRescues = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const rescues = await Rescue.find(filter)
    .populate("requestedBy", "name phone")
    .populate("assignedVolunteer", "name phone")
    .sort("-createdAt");
  res.json(rescues);
});

// @desc Volunteer accepts / updates a rescue
// @route PUT /api/rescues/:id/status
export const updateRescueStatus = asyncHandler(async (req, res) => {
  const rescue = await Rescue.findById(req.params.id);
  if (!rescue) {
    res.status(404);
    throw new Error("Rescue request not found");
  }
  rescue.status = req.body.status || rescue.status;
  if (req.body.assignedVolunteer) rescue.assignedVolunteer = req.body.assignedVolunteer;
  const updated = await rescue.save();
  res.json(updated);
});
