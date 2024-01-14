// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");

const UserApi = require("./userModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");

// Displays list of all Users.

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await UserApi.getAllUsers();

  res.status(200).json({ allUsers }); // list can be empty!
});

// Displays detail page for a specific User

exports.getOneUser = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  const user = await UserApi.getOneUser(username);

  res.status(200).json({ user });
});

// Handle Profile update on PATCH

exports.updateOneUserProfile = asyncHandler(async (req, res, next) => {
  const isRequestBodyEmpty = Object.keys(req.body).length === 0;

  if (isRequestBodyEmpty) {
    throw new BadRequestError(
      "No updataData available. req.body object is empty."
    );
  }

  const updatedUserProfile = await UserApi.updateOneUserProfile(
    req.username,
    req.body
  );
  res.status(200).json({ updatedUserProfile });
});

//
/** REQUEST TRIP MEMBERS (creates new TRIP MEMBER)
 *
 * Handle User trip request on POST
 *
 **/
exports.createNewTripMemberRequest = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.id);
  const tripPassengerUsername = req.username;
  const { memberStatus } = req.body;

  const newTripMemberRequest = await UserApi.createNewTripMemberRequest(
    tripPassengerUsername,
    tripId,
    memberStatus
  );

  res.status(201).json({ newTripMemberRequest });
});

/** CANCEL MY TRIP MEMBERSHIP REQUEST
 *
 * Handle cancel trip membership on DELETE
 * as PASSENGER if not already ('approved')
 * and not TRIP OWNER
 **/
exports.cancelOneTripMemberRequest = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.id);
  const tripPassengerUsername = req.username;

  const cancelledTripMemberRequest = await UserApi.cancelOneTripMemberRequest(
    tripPassengerUsername,
    tripId
  );

  res
    .status(204)
    .json({ message: "Trip member request cancelled successfully" });
});

/** RESPOND TO TRIP MEMBERSHIP REQUEST
 *
 * Handle respond to trip membership on PATCH as TRIP OWNER
 **/
exports.respondOneTripMemberRequest = asyncHandler(async (req, res, next) => {
  const tripId = parseInt(req.params.id);
  const memberStatusResponse = req.body.memberStatus;
  const tripOwnerUsername = req.username;
  const tripPassengerUsername = req.params.username;

  const respondToTripMemberRequest = await UserApi.respondOneTripMemberRequest(
    tripId,
    tripOwnerUsername,
    tripPassengerUsername,
    memberStatusResponse
  );

  res.status(200).json({ respondToTripMemberRequest });
});
