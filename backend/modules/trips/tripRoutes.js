const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const tripController = require("./tripController");
const { authenticate } = require("../../middleware/authenticate");
const { authorize, ensureCorrectUser } = require("../../middleware/authorize");
const { validateInputs } = require("../../middleware/validateInputs");
const { createTripSchema } = require("./tripSchemas/createTripSchema");
const { updateTripSchema } = require("./tripSchemas/updateTripSchema");

module.exports = router;

/// TRIP ROUTES ///

// POST request for creating Trip.
router.post(
  "/",
  authenticate,
  // ensureCorrectUser,
  validateInputs(createTripSchema),
  tripController.createNewTrip
);

// POST request to delete Trip.
router.delete(
  "/:tripId",
  authenticate,
  authorize("admin"),
  tripController.deleteOneTrip
);

// PATCH request to update Trip.
router.patch(
  "/:tripId",
  authenticate,
  validateInputs(updateTripSchema),
  tripController.updateOneTrip
);

// GET request for one Trip.
router.get("/:tripId", tripController.getOneTrip);
// router.get("/:tripId", asyncHandler(tripController.getOneTrip));

// GET request for list of all Trips.
router.get("/", tripController.getAllTrips);
