// This defines a wrapper function that hides the try...catch block and the code to forward the error.
const asyncHandler = require("express-async-handler");
const TripApi = require("./tripModel");
const { body, validationResult } = require("express-validator");
const { BadRequestError } = require("../../expressError");

// Display list of all Trips.
exports.trip_list = asyncHandler(async (req, res, next) => {
  const trips = await TripApi.getAllTrips();
  res.json({ trips });
});

// Display detail page for a specific Trip.
exports.trip_detail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const trip = await TripApi.getTrip(id);

  if (!trip) throw new Error(`No trip found with ID: ${id}`);

  res.json(trip);
});

// Display trip create form on GET.
exports.trip_create_get = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: trip create Form");
});

// Handle create trip post
exports.trip_create_post = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.array() });
    // throw new BadRequestError(errors.array());
  }

  const formData = req.body;
  const newTrip = await TripApi.createTrip(formData);
  res.json(newTrip);
});
