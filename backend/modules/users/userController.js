// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");

const UserApi = require("./userModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");

// Displays list of all Users.
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await UserApi.getAllUsers();

  res.status(200).json({ success: true, data: allUsers }); // list can be empty!
});

// Displays detail page for a specific User
exports.getOneUser = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  const user = await UserApi.getOneUser(username);
  // const userData = await UserApi.getOneUser(username);
  // const userTrips = await TripApi;
  // const userPassenger = await PassengerApi;

  res.status(200).json({ success: true, data: user });
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
  const updatedUserProfile = await UserApi.updateUserProfile(
    loggedInUser,
    req.body
  );
  res.status(200).json({ success: true, data: updatedUserProfile });
});

// Displays list of all Trips from Users. (trip owner & join request trips and saved trips)
exports.getAllUserTrips = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.username;
  const allUserTrips = await UserApi.getAllUserTrips(loggedInUser);

  // const myTripsAsOwner = allUserTrips.filter(
  //   (trip) => trip.tripOwner === loggedInUser
  // );

  // const myTripsAsPassenger = allUserTrips.filter(
  //   (trip) => trip.passengerUsername === loggedInUser
  // );

  res
    .status(200)
    // .json({ success: true, data: { myTripsAsOwner, myTripsAsPassenger } });
    .json({ success: true, data: allUserTrips });
});

// Display one User reservation for a trip
exports.getOneUserReservation = asyncHandler(async (req, res, next) => {
  // const loggedInUser = req.username;
  const username = req.params.username;
  const tripId = req.params.tripId;

  const userReservation = await UserApi.getOneUserReservation(username, tripId);

  res.status(200).json({ success: true, data: userReservation });
});

// Handle delete trip as trip owner
exports.deleteMyTrip = asyncHandler(async (req, res, next) => {
  const username = req.params.username;
  const tripId = parseInt(req.params.tripId);

  await UserApi.deleteMyTrip(tripId, username);

  res
    .status(204)
    .json({ success: true, data: { message: "Trip deleted successfully" } });
});
