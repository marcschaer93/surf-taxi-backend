const UserApi = require("./userModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");

// Middleware for error handling in async functions without explicit try-catch blocks.
const asyncHandler = require("express-async-handler");

/**
 * Get all users.
 * Responds with a list of all users. The list can be empty.
 */
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await UserApi.getAllUsers();

  res.status(200).json({ success: true, data: allUsers }); // list can be empty!
});

/**
 * Get a single user by username.
 */
exports.getOneUser = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  const user = await UserApi.getOneUser(username);

  res.status(200).json({ success: true, data: user });
});

/**
 * Update user profile.
 * Throws BadRequestError if request body is empty.
 */
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

/**
 * Get all trips associated with the logged-in user.
 */
exports.getAllUserTrips = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.username;
  const allUserTrips = await UserApi.getAllUserTrips(loggedInUser);

  res.status(200).json({ success: true, data: allUserTrips });
});

/**
 * Get a user's reservation for a specific trip.
 */
exports.getOneUserReservation = asyncHandler(async (req, res, next) => {
  const username = req.params.username;
  const tripId = parseInt(req.params.tripId);

  const userReservation = await UserApi.getOneUserReservation(username, tripId);

  res.status(200).json({ success: true, data: userReservation });
});

/**
 * Get all reservations for the logged-in user.
 */
exports.getAllUserReservations = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.username;
  const userReservations = await UserApi.getAllUserReservations(loggedInUser);

  res.status(200).json({ success: true, data: userReservations });
});

/**
 * Delete a trip as the trip owner.
 */
exports.deleteMyTrip = asyncHandler(async (req, res, next) => {
  const username = req.params.username;
  const tripId = parseInt(req.params.tripId);

  await UserApi.deleteMyTrip(tripId, username);

  res
    .status(204)
    .json({ success: true, data: { message: "Trip deleted successfully" } });
});

/**
 * Update user favorites.
 */
exports.updateUserFavoriteIds = asyncHandler(async (req, res, next) => {
  const { favoriteIds } = req.body;
  console.log("FAVORITE IDS", favoriteIds);

  const updatedUser = await UserApi.updateUserFavoriteIds(
    req.params.username,
    favoriteIds
  );

  res.status(200).json({ success: true, data: updatedUser });
});

/**
 * Check notifications for a user.
 */
exports.checkNotifications = asyncHandler(async (req, res, next) => {
  const username = req.params.username;
  const notifications = await UserApi.checkNotifications(username);
  res.status(200).json({ success: true, data: notifications });
});

/**
 * Mark a notification as read for a user.
 */
exports.markNotificationAsRead = asyncHandler(async (req, res, next) => {
  const username = req.params.username;
  const notificationId = parseInt(req.params.notificationId);

  await UserApi.markNotificationAsRead(username, notificationId);

  res.status(200).json({ success: true });
});
