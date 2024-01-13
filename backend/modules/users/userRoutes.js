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

// POST request to request for a trip
router.post(
  "/:username/trips/:id",
  authenticate,
  userController.userRequestTrip
);

// PATCH request to update a request for a trip
// router.patch(
//   "/:username/trips/:id/update",
//   userController.userRequestTripUpdate
// );
