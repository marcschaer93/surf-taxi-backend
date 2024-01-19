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

exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const isRequestBodyEmpty = Object.keys(req.body).length === 0;

  if (isRequestBodyEmpty) {
    throw new BadRequestError(
      "No updataData available. req.body object is empty."
    );
  }

  const loggedInUser = req.username;
  const updatedUserProfile = await UserApi.updateOneUserProfile(
    loggedInUser,
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
// exports.requestToJoin = asyncHandler(async (req, res, next) => {
//   const tripId = parseInt(req.params.id);
//   const currentUser = req.username;

//   const newJoinRequest = await UserApi.requestToJoin(tripId, currentUser);

//   res.status(201).json({
//     success: true,
//     data: {
//       newJoinRequest,
//       tripOwner: req.params.username,
//       passenger: currentUser,
//     },
//   });
// });

/** CANCEL MY TRIP MEMBERSHIP REQUEST
 *
 * Handle cancel trip membership on DELETE
 * as PASSENGER if not already ('approved')
 * and not TRIP OWNER
 **/
// exports.removeMyJoinRequest = asyncHandler(async (req, res, next) => {
//   const tripId = parseInt(req.params.id);
//   const currentUser = req.username;

//   await UserApi.removeMyJoinRequest(tripId, currentUser);

//   res
//     .status(204)
//     .json({ message: "Passenger join request cancelled successfully" });
// });

/** RESPOND TO TRIP MEMBERSHIP REQUEST
 *
 * Handle respond to trip membership on PATCH as TRIP OWNER
 **/
// exports.respondToJoinRequest = asyncHandler(async (req, res, next) => {
//   const tripId = parseInt(req.params.id);
//   const reservationStatusResponse = req.body.reservationStatus;
//   const passenger = req.params.username;
//   const currentUser = req.username;

//   const respondedRequest = await UserApi.respondToJoinRequest(
//     tripId,
//     currentUser,
//     passenger,
//     reservationStatusResponse
//   );

//   res.status(200).json({
//     success: true,
//     data: { respondedRequest, tripOwner: currentUser, passenger: passenger },
//   });
// });
