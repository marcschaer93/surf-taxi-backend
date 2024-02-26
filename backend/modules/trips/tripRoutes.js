const express = require("express");
const router = express.Router();

const tripController = require("./tripController");
const { authenticate } = require("../../middleware/authenticate");
const { authorize, ensureCorrectUser } = require("../../middleware/authorize");
const { validateInputs } = require("../../middleware/validateInputs");
const { createTripSchema } = require("./tripSchemas/createTripSchema");
const { updateTripSchema } = require("./tripSchemas/updateTripSchema");

/// TRIP ROUTES ///

// List all trips
router.get("/", tripController.getAllTrips);

// Get a single trip
router.get("/:tripId", tripController.getOneTrip);

// Create a new trip
router.post(
  "/",
  authenticate,
  validateInputs(createTripSchema),
  tripController.createNewTrip
);

// Update a trip
router.patch(
  "/:tripId",
  authenticate,
  validateInputs(updateTripSchema),
  tripController.updateOneTrip
);

// Delete a trip (Admin only)
router.delete(
  "/:tripId",
  authenticate,
  authorize("admin"),
  tripController.deleteOneTrip
);

module.exports = router;
