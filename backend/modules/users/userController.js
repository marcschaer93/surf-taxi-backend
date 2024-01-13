// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");

const UserApi = require("./userModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");

// Displays list of all Users.

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await UserApi.getAllUsers();

  res.status(200).json({ users }); // list can be empty!
});

// Displays detail page for a specific User

exports.getUserDetails = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  const user = await UserApi.getUserDetails(username);

  res.status(200).json(user);
});

// Handle Profile update on PATCH

exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  // Check if req.body is an empty object
  if (Object.keys(req.body).length === 0)
    throw new BadRequestError(
      "No updataData available. req.body object is empty."
    );

  const updatedUser = await UserApi.updateUserProfile(req.username, req.body);
  res.status(200).json(updatedUser);
});

//
/** REQUEST TRIP MEMBERSHIP (creates new TRIP MEMBERSHIP)
 *
 * Handle User trip request on POST
 *
 **/
exports.requestTripMembership = asyncHandler(async (req, res) => {
  const tripId = req.params.id;
  const username = req.username;
  const { requestStatus } = req.body;

  const requestedTrip = await UserApi.requestTripMembership(
    username,
    tripId,
    requestStatus
  );

  res.status(201).json({ requestedTrip });
});

/** CANCEL MY TRIP MEMBERSHIP REQUEST
 *
 * Handle cancel trip membership on DELETE
 * as PASSENGER if not already ('approved')
 * and not TRIP OWNER
 **/
exports.cancelTripMembership = asyncHandler(async (req, res) => {
  const tripId = req.params.id;
  const username = req.username;

  const cancelledTripRequest = await UserApi.cancelTripMembership(
    username,
    tripId
  );

  // Respond with success if cancellation is successful
  res.status(204).send();
});

/** RESPOND TO TRIP MEMBERSHIP REQUEST
 *
 * Handle respond to trip membership on PATCH as TRIP OWNER
 **/
exports.respondTripMembership = asyncHandler(async (req, res) => {
  const tripId = req.params.id;
  const tripPassengerUsername = req.params.username;

  const tripOwnerUsername = req.username;
  const requestStatus = await UserApi.respondTripMembership(
    tripId,
    tripOwnerUsername,
    tripPassengerUsername
  );

  res.status(200).json({ requestStatus });
});
