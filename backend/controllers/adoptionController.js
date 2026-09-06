import asyncHandler from "express-async-handler";
import Adoption, { AdoptionApplication } from "../models/Adoption.js";

// @desc Create adoption listing
// @route POST /api/adoptions
export const createListing = asyncHandler(async (req, res) => {
  const images = (req.files || []).map((f) => f.path);
  const listing = await Adoption.create({
    ...req.body,
    temperament: req.body.temperament ? req.body.temperament.split(",") : [],
    postedBy: req.user._id,
    images,
  });
  res.status(201).json(listing);
});

// @desc Get all adoption listings
// @route GET /api/adoptions
export const getListings = asyncHandler(async (req, res) => {
  const { species, status = "Available", location } = req.query;
  const filter = { status };
  if (species) filter.species = species;
  if (location) filter.location = new RegExp(location, "i");

  const listings = await Adoption.find(filter).sort("-createdAt");
  res.json(listings);
});

// @desc Get single listing
// @route GET /api/adoptions/:id
export const getListingById = asyncHandler(async (req, res) => {
  const listing = await Adoption.findById(req.params.id).populate("postedBy", "name email");
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }
  res.json(listing);
});

// @desc Apply to adopt a listing
// @route POST /api/adoptions/:id/apply
export const applyToAdopt = asyncHandler(async (req, res) => {
  const listing = await Adoption.findById(req.params.id);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  const application = await AdoptionApplication.create({
    listing: listing._id,
    applicant: req.user._id,
    message: req.body.message,
    contactPhone: req.body.contactPhone,
  });

  listing.status = "Pending";
  await listing.save();

  res.status(201).json(application);
});
