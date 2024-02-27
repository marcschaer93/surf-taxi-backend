const ReservationApi = require("./reservationModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");

// Middleware for error handling in async functions without explicit try-catch blocks.
const asyncHandler = require("express-async-handler");

/**
 * Retrieve all reservations for a specific trip.
 */
exports.getAllTripReservations = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const tripReservations = await ReservationApi.getAllTripReservations(tripId);

  res.status(200).json({ success: true, data: tripReservations });
});

/**
 * Create a new reservation for a trip.
 */
exports.createNewReservation = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const currentUser = req.username;

  const newReservation = await ReservationApi.createNewReservation(
    tripId,
    currentUser
  );

  res.status(201).json({
    success: true,
    data: newReservation,
  });
});

/**
 * Update the status of an existing reservation.
 */
exports.updateOneReservation = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const { newStatus, reservationUsername } = req.body;

  const updatedReservation = await ReservationApi.updateOneReservation(
    tripId,
    reservationUsername,
    newStatus
  );

  res.status(200).json({ success: true, data: updatedReservation });
});

/**
 * Cancel a specific reservation.
 */
exports.deleteOneReservation = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const currentUser = req.username;

  await ReservationApi.deleteOneReservation(tripId, currentUser);

  res.status(204).json({
    success: true,
    data: { message: "Reservation cancelled successfully" },
  });
});
