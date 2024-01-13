const express = require("express");
const router = express.Router();

const tripController = require("./tripController");
const { authenticate } = require("../../middleware/authenticate");
const { authorize } = require("../../middleware/authorize");
const { validateInputs } = require("../../middleware/validateInputs");
const { createTripSchema } = require("./tripSchemas/createTripSchema");
const { updateTripSchema } = require("./tripSchemas/updateTripSchema");

module.exports = router;

/// TRIP ROUTES ///

// POST request for creating Trip.
router.post(
  "/",
  authenticate,
  validateInputs(createTripSchema),
  tripController.createTrip
);

// POST request to delete Trip.
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  tripController.deleteTrip
);

// PATCH request to update Trip.
router.patch(
  "/:id",
  authenticate,
  validateInputs(updateTripSchema),
  tripController.updateTrip
);

// GET request for one Trip.
router.get("/:id", tripController.getTripDetails);

// GET request for list of all Trips.
router.get("/", tripController.getAllTrips);

// ---------------------------------------------------

// // GET request to delete Trip.
// router.get("/:id/delete", tripController.tripDelete);

// GET request to update Trip.
// router.get("/:id/update", tripController.tripUpdate);
