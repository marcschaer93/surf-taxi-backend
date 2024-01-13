const express = require("express");
const router = express.Router();

const tripController = require("./tripController");
const { authenticate } = require("../../middleware/authenticate");
const { authorize } = require("../../middleware/authorize");
const { validateInputs } = require("../../middleware/validateInputs");
const { tripNewSchema } = require("../trips/tripSchemas/tripNewSchema");
const { tripUpdateSchema } = require("../trips/tripSchemas/tripUpdateSchema");

module.exports = router;

/// TRIP ROUTES ///

// POST request for creating Trip.
router.post(
  "/create",
  authenticate,
  validateInputs(tripNewSchema),
  tripController.createTrip
);

// POST request to delete Trip.
router.delete(
  "/:id/delete",
  authenticate,
  authorize("admin"),
  tripController.tripDelete
);

// PATCH request to update Trip.
router.patch(
  "/:id/update",
  authenticate,
  validateInputs(tripUpdateSchema),
  tripController.tripUpdate
);

// GET request for one Trip.
router.get("/:id", tripController.tripDetail);

// GET request for list of all Trips.
router.get("/", tripController.tripList);

// ---------------------------------------------------

// // GET request to delete Trip.
// router.get("/:id/delete", tripController.tripDelete);

// GET request to update Trip.
// router.get("/:id/update", tripController.tripUpdate);
