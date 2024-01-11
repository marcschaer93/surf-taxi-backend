const express = require("express");

const router = express.Router();
const db = require("../../db/db.js");
const userController = require("./userController.js");
const { validateInputs } = require("../../middleware/validateInputs");
const { authenticateJWT } = require("../../middleware/isAuthenticated.js");

// export our router to be mounted by the parent application
module.exports = router;

// USER ROUTES

// GET request for all Users.
router.get("/", userController.userList);

// GET request for one User
router.get("/:username", userController.userDetail);

// PATCH request to update a User
// router.patch("/:username/update", );

// POST request to request for a trip
router.post(
  "/:username/trips/:id",
  authenticateJWT,
  userController.userRequestTrip
);

// PATCH request to update a request for a trip
// router.patch(
//   "/:username/trips/:id/update",
//   userController.userRequestTripUpdate
// );

// http://localhost:3000/api/users/marcschaer/trips/1
