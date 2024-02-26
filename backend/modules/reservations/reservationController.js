// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");

const ReservationApi = require("./reservationModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");

//
exports.getAllTripReservations = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const tripReservations = await ReservationApi.getAllTripReservations(tripId);

  res.status(200).json({ success: true, data: tripReservations });
});

/** REQUEST TO JOIN A TRIP (creates new reservation)
 *
 * Handle User trip request on POST
 *
 **/
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

exports.updateOneReservation = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  // needs reservation username
  // const username = req.params.username;
  const { newStatus, reservationUsername } = req.body;

  const updatedReservation = await ReservationApi.updateOneReservation(
    tripId,
    reservationUsername,
    newStatus
  );

  res.status(200).json({ success: true, data: updatedReservation });
});

/** CANCEL OWN JOIN REQUEST
 *
 * Handle cancel trip membership on DELETE
 * as PASSENGER if not already ('approved')
 * and not TRIP OWNER
 **/
exports.deleteOneReservation = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const currentUser = req.username;

  await ReservationApi.deleteOneReservation(tripId, currentUser);

  res.status(204).json({
    success: true,
    data: { message: "Reservation cancelled successfully" },
  });
});
