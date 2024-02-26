const express = require("express");

const router = express.Router();
const db = require("../../db/index.js");
const userController = require("./userController.js");
const { authenticate } = require("../../middleware/authenticate.js");
const {
  ensureCorrectUser,
  authorize,
  ensureNotOwnTrip,
} = require("../../middleware/authorize.js");
const {
  updateUserProfileSchema,
} = require("./userSchemas/updateUserProfileSchema.js");
const { validateInputs } = require("../../middleware/validateInputs.js");
const {
  createNewTripMemberRequestSchema,
} = require("./userSchemas/createNewTripMemberRequestSchema.js");

/// USER ROUTES ///

// List all users (Admin only)
router.get("/", authenticate, authorize("admin"), userController.getAllUsers);

// Get user profile
router.get("/:username", authenticate, userController.getOneUser);

// Update user profile
router.patch(
  "/:username",
  authenticate,
  ensureCorrectUser,
  validateInputs(updateUserProfileSchema),
  userController.updateUserProfile
);

// Get all user's related trips (organized trips and reservations)
router.get(
  "/:username/trips",
  authenticate,
  ensureCorrectUser,
  userController.getAllUserTrips
);

// Get details of a specific trip and reservation for a user
router.get(
  "/:username/trips/:tripId",
  authenticate,
  userController.getOneUserReservation
);

// List all user's reservations
router.get(
  "/:username/reservations",
  authenticate,
  // ensureCorrectUser,
  userController.getAllUserReservations
);

// Delete a trip as the trip owner (Not implemented: restriction on deletion if there are pending requests)
router.delete(
  "/:username/trips/:tripId",
  authenticate,
  ensureCorrectUser,
  userController.deleteMyTrip
);

// Update user's favorite trip IDs
router.patch(
  "/:username/favorites",
  authenticate,
  ensureCorrectUser,
  userController.updateUserFavoriteIds
);

/// Notifications ///

// Check for new notifications for a user
router.get(
  "/:username/check-notifications",
  authenticate,
  ensureCorrectUser,
  userController.checkNotifications
);

// Mark a specific notification as read
router.patch(
  "/:username/notifications/:notificationId",
  authenticate,
  ensureCorrectUser,
  userController.markNotificationAsRead
);

module.exports = router;
