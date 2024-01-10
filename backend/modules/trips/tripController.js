// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");

const TripApi = require("./tripModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");

// Display list of all Trips.
exports.tripList = asyncHandler(async (req, res) => {
  const trips = await TripApi.getAllTrips();
  return res.status(201).json({ trips });
});

// Display detail page for a specific Trip.
exports.tripDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const trip = await TripApi.getTrip(id);
  return res.status(201).json(trip);
});

// Display trip create form on GET.
exports.tripCreateGet = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: trip create Form");
});

// Handle Trip create on POST.
exports.tripCreatePost = asyncHandler(async (req, res) => {
  const validTripData = req.body;
  const newTrip = await TripApi.createTrip(validTripData);

  return res.status(201).json({ newTrip });
});

// Display trip delete form on GET.
exports.tripDeleteGet = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Trip delete GET");
});

// Handle trip delete on POST.
exports.tripDeletePost = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Trip delete POST");
});

// Display trip update form on GET.
exports.tripUpdateGet = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Trip update GET");
});

// Handle trip update on PATCH.
exports.tripUpdatePatch = asyncHandler(async (req, res) => {
  const tripId = req.params.id;
  const updateTripData = req.body;

  const updatedTrip = await TripApi.updateTrip(tripId, updateTripData);

  if (updatedTrip) {
    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      updatedTrip,
    });
  } else {
    res.status(500).json({ success: false, message: "Failed to update trip" });
  }
});
