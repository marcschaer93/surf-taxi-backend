// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");

const PassengerApi = require("./passengerModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");

//
/** REQUEST TO JOIN A TRIP (creates new passenger)
 *
 * Handle User trip request on POST
 *
 **/
exports.requestToJoin = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const currentUser = req.username;

  const newJoinRequest = await PassengerApi.requestToJoin(tripId, currentUser);

  res.status(201).json({
    success: true,
    data: {
      newJoinRequest,
      // passenger: currentUser,
    },
  });
});

/** CANCEL OWN JOIN REQUEST
 *
 * Handle cancel trip membership on DELETE
 * as PASSENGER if not already ('approved')
 * and not TRIP OWNER
 **/
exports.cancelJoinRequest = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const currentUser = req.username;

  await PassengerApi.cancelJoinRequest(tripId, currentUser);

  res.status(204).json({
    success: true,
    data: { message: "Passenger join request cancelled successfully" },
  });
});

/** RESPOND TO JOIN REQUEST
 *
 * Handle respond to trip membership on PATCH as TRIP OWNER
 **/
exports.respondToJoinRequest = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const currentUser = req.username;
  const passenger = req.params.passengerUsername;
  const response = req.body.response;

  const tripJoinResponse = await PassengerApi.respondToJoinRequest(
    tripId,
    currentUser,
    passenger,
    response
  );

  res.status(200).json({
    success: true,
    data: { tripJoinResponse, tripOwner: currentUser, passenger: passenger },
  });
});

exports.getTripPassengers = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const tripPassengers = await PassengerApi.getTripPassengers(tripId);

  res.status(200).json({ success: true, data: tripPassengers });
});

exports.updatePassengerStatus = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.tripId);
  const passengerUsername = req.params.passengerUsername;
  const { newStatus } = req.body;

  const updatedPassenger = await PassengerApi.updatePassengerStatus(
    tripId,
    passengerUsername,
    newStatus
  );

  res.status(200).json({ success: true, data: updatedPassenger });
});
