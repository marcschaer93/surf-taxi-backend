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
  userUpdateProfileSchema,
} = require("./userSchemas/userUpdateProfileSchema.js");
const { validateInputs } = require("../../middleware/validateInputs.js");
const {
  userRequestTripSchema,
} = require("./userSchemas/userRequestTripSchema.js");

// export our router to be mounted by the parent application
module.exports = router;

// USER ROUTES

// GET request for all Users.
router.get("/", authenticate, authorize("admin"), userController.userList);

// GET request for one User
router.get("/:username", authenticate, userController.userDetail);

// PATCH request to update user profile
router.patch(
  "/:username/update",
  authenticate,
  ensureCorrectUser,
  validateInputs(userUpdateProfileSchema),
  userController.updateUserProfile
);

// POST request to REQUEST for a trip
router.post(
  "/:username/trips/:id",
  authenticate,
  validateInputs(userRequestTripSchema),
  userController.userRequestTrip
);

// DELETE request to CANCEL a request for a trip if not already "approved"
router.delete(
  "/:username/trips/:id",
  authenticate,
  userController.cancelUserTripRequest
);
