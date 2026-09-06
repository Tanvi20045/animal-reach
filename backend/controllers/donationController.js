import asyncHandler from "express-async-handler";
import Donation from "../models/Donation.js";

// @desc Record a donation (integrate Razorpay/Stripe order creation here)
// @route POST /api/donations
export const createDonation = asyncHandler(async (req, res) => {
  const { donorName, donorEmail, amount, purpose, message, anonymous } = req.body;

  const donation = await Donation.create({
    donor: req.user?._id,
    donorName,
    donorEmail,
    amount,
    purpose,
    message,
    anonymous,
    status: "Created",
  });

  // NOTE: plug in Razorpay/Stripe order creation here, return order details
  res.status(201).json({ donation, note: "Connect a payment gateway to move status to Success." });
});

// @desc Get donation stats (for transparency page)
// @route GET /api/donations/stats
export const getDonationStats = asyncHandler(async (req, res) => {
  const stats = await Donation.aggregate([
    { $match: { status: "Success" } },
    { $group: { _id: "$purpose", total: { $sum: "$amount" }, count: { $sum: 1 } } },
  ]);
  const totalRaised = stats.reduce((sum, s) => sum + s.total, 0);
  res.json({ totalRaised, breakdown: stats });
});
