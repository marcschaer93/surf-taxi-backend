// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");

const TripApi = require("./tripModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");

// Display list of all Trips. (exclude OwnTrips)
exports.getAllTrips = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.username;
  const allTrips = await TripApi.getAllTrips();

  res.status(200).json({ success: true, data: allTrips });
});

// Display detail page for a specific Trip.
exports.getOneTrip = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const tripDetails = await TripApi.getOneTrip(tripId);

  res.status(200).json({ success: true, data: tripDetails });
});

// Handle Trip create on POST.
exports.createNewTrip = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.username;
  const newTrip = await TripApi.createNewTrip(req.body, loggedInUser);

  res.status(201).json({ success: true, data: newTrip });
});

// Handle trip delete on POST.
exports.deleteOneTrip = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  await TripApi.deleteOneTrip(tripId);

  res
    .status(204)
    .json({ success: true, data: { message: "Trip deleted successfully" } });
});

// Handle trip update on PATCH.
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
