const express = require("express");

const router = express.Router();
const db = require("../../db/db.js");
const userController = require("./userController.js");
const { authenticate } = require("../../middleware/authenticate.js");
const {
  ensureCorrectUser,
  authorize,
} = require("../../middleware/authorize.js");
const {
  updateUserProfileSchema,
} = require("./userSchemas/updateUserProfileSchema.js");
const { validateInputs } = require("../../middleware/validateInputs.js");
const {
  requestTripMembershipSchema,
} = require("./userSchemas/requestTripMembershipSchema.js");

// export our router to be mounted by the parent application
module.exports = router;

// USER ROUTES

// GET request for all Users.
router.get("/", authenticate, authorize("admin"), userController.getAllUsers);

// GET request for one User
router.get("/:username", authenticate, userController.getUserDetails);

// PATCH request to update user profile
router.patch(
  "/:username",
  authenticate,
  ensureCorrectUser,
  validateInputs(updateUserProfileSchema),
  userController.updateUserProfile
);

// POST request to REQUEST for a trip membership
router.post(
  "/:username/trips/:id",
  authenticate,
  validateInputs(requestTripMembershipSchema),
  userController.requestTripMembership
);

// PATCH request to RESPOND to a requested trip membership
router.patch(
  "/:username/trips/:id",
  authenticate,
  //   validateInputs(respondTripMembershipSchema),
  userController.respondTripMembership
);

/** DELETE request to CANCEL a requested trip membership
 *
 * Cancels a requested trip membership if:
 * - the user is not the trip "owner"
 * - it's already "approved."
 *
 **/
router.delete(
  "/:username/trips/:id",
  authenticate,
  userController.cancelTripMembership
);
