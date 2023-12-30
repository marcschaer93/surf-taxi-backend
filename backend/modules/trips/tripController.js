// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");
const jsonschema = require("jsonschema");

const TripApi = require("./tripModel");
const { BadRequestError } = require("../../expressError");

const tripNewSchema = require("./tripNewSchema.json");

// Display list of all Trips.
exports.trip_list = asyncHandler(async (req, res, next) => {
  const trips = await TripApi.getAllTrips();
  res.json({ trips });
});

// Display detail page for a specific Trip.
exports.trip_detail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const trip = await TripApi.getTrip(id);
  res.json(trip);
});

// Display trip create form on GET.
exports.trip_create_get = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: trip create Form");
});

// Handle Trip create on POST.
exports.trip_create_post = asyncHandler(async (req, res) => {
  const tripData = req.body;
  const validator = jsonschema.validate(tripData, tripNewSchema);
  if (!validator.valid) {
    const errors = validator.errors.map((e) => e.stack);
    throw new BadRequestError(errors);
  }

  const newTrip = await TripApi.createTrip(tripData);
  res.json(newTrip);
});
