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

module.exports = router;

// USER ROUTES

// GET request for all Users.
router.get("/", authenticate, authorize("admin"), userController.getAllUsers);

// GET request for one user (profile)
router.get("/:username/profile", authenticate, userController.getOneUser);

// PATCH request to update user (profile)
router.patch(
  "/:username/profile",
  authenticate,
  ensureCorrectUser,
  validateInputs(updateUserProfileSchema),
  userController.updateUserProfile
);

// GET request for all trips and reservations of user
router.get("/:username/trips");
