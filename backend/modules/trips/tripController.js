const TripApi = require("./tripModel");

// Middleware for error handling in async functions without explicit try-catch blocks.
const asyncHandler = require("express-async-handler");

/**
 * Get all trips.
 */
exports.getAllTrips = asyncHandler(async (req, res, next) => {
  const filter = req.query;
  const allTrips = await TripApi.getAllTrips(filter);

  res.status(200).json({ success: true, data: allTrips });
});

/**
 * Get details of a specific trip.
 */
exports.getOneTrip = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const tripDetails = await TripApi.getOneTrip(tripId);

  res.status(200).json({ success: true, data: tripDetails });
});

/**
 * Create a new trip.
 */
exports.createNewTrip = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.username;
  const newTrip = await TripApi.createNewTrip(req.body, loggedInUser);

  res.status(201).json({ success: true, data: newTrip });
});

/**
 * Update details of a specific trip.
 */
exports.updateOneTrip = asyncHandler(async (req, res) => {
  const tripId = parseInt(req.params.tripId);
  const loggedInUser = req.username;
  const updatedTrip = await TripApi.updateOneTrip(
    tripId,
    req.body,
    loggedInUser
  );

  res.status(200).json({ success: true, data: updatedTrip });
});

/**
 * Delete a specific trip.
 */
exports.deleteOneTrip = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  await TripApi.deleteOneTrip(tripId);

  res
    .status(204)
    .json({ success: true, data: { message: "Trip deleted successfully" } });
});
