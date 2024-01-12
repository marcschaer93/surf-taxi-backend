// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");

const UserApi = require("./userModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");

// Displays list of all Users.
exports.userList = asyncHandler(async (req, res, next) => {
  const users = await UserApi.getAllUsers();

  res.status(200).json({ users }); // list can be empty!
});

// Displays detail page for a specific User
exports.userDetail = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  const user = await UserApi.getUser(username);

  res.status(200).json(user);
});

// Handle Profile update on PATCH
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  // Check if req.body is an empty object
  if (Object.keys(req.body).length === 0)
    throw new BadRequestError(
      "No updataData available. req.body object is empty."
    );

  const updatedUser = await UserApi.updateProfile(req.username, req.body);
  res.status(200).json(updatedUser);
});

// Handle User trip request on POST
exports.userRequestTrip = asyncHandler(async (req, res) => {
  const trip_id = req.params.id;
  const username = req.username;
  const { request_status } = req.body;

  const requestStatus = await UserApi.requestTrip(
    username,
    trip_id,
    request_status
  );

  res.status(201).json({ requestStatus });
});

// Handle User trip request update on PATCH
// exports.userRequestTripUpdate = asyncHandler(async (req, res) => {
//   const { id } = req.params.id;

//   const requestStatus = await UserApi.requestTrip(id);

//   res.status(200).json({ requestStatus });
// });
