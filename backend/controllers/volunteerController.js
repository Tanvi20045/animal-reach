import asyncHandler from "express-async-handler";
import Volunteer from "../models/Volunteer.js";
import User from "../models/User.js";

// @desc Register as a volunteer
// @route POST /api/volunteers
export const registerVolunteer = asyncHandler(async (req, res) => {
  const existing = await Volunteer.findOne({ user: req.user._id });
  if (existing) {
    res.status(400);
    throw new Error("You have already registered as a volunteer");
  }

  const volunteer = await Volunteer.create({
    ...req.body,
    skills: req.body.skills ? req.body.skills.split(",") : [],
    user: req.user._id,
  });

  await User.findByIdAndUpdate(req.user._id, { role: "volunteer" });

  res.status(201).json(volunteer);
});

// @desc Get all volunteers
// @route GET /api/volunteers
export const getVolunteers = asyncHandler(async (req, res) => {
  const { city, status = "Active" } = req.query;
  const filter = { status };
  if (city) filter.city = new RegExp(city, "i");
  const volunteers = await Volunteer.find(filter).populate("user", "name email phone");
  res.json(volunteers);
});
