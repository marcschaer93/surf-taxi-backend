// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");

const TripApi = require("./tripModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");

// Display list of all Trips.
exports.getAllTrips = asyncHandler(async (req, res) => {
  const allTrips = await TripApi.getAllTrips();
  res.status(200).json({ allTrips });
});

// Display detail page for a specific Trip.
exports.getOneTrip = asyncHandler(async (req, res) => {
  const trip = await TripApi.getOneTrip(parseInt(req.params.tripId));

  res.status(200).json({ trip });
});

// Handle Trip create on POST.
exports.createNewTrip = asyncHandler(async (req, res) => {
  const newTrip = await TripApi.createNewTrip(req.body, req.username);

  res.status(201).json({ newTrip });
});

// Handle trip delete on POST.
exports.deleteOneTrip = asyncHandler(async (req, res) => {
  await TripApi.deleteOneTrip(parseInt(req.params.tripId));

  res.status(204).json({ message: "Trip deleted successfully" });
});

// Handle trip update on PATCH.
exports.updateOneTrip = asyncHandler(async (req, res) => {
  const tripId = req.params.tripId;
  const updatedTrip = await TripApi.updateOneTrip(
    tripId,
    req.body,
    req.username
  );

  res.status(200).json({ updatedTrip });
});
