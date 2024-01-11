const tripController = require("./tripController");

const express = require("express");
const router = express.Router();
const { validateInputs } = require("../../middleware/validateInputs");
const tripNewSchema = require("./tripNewSchema.json");
const tripUpdateSchema = require("./tripUpdateSchema.json");

const { authenticateJWT } = require("../../middleware/isAuthenticated");

module.exports = router;

/// TRIP ROUTES ///

// POST request for creating Trip.
router.post(
  "/create",
  authenticateJWT,
  validateInputs(tripNewSchema),
  tripController.tripCreate
);

// POST request to delete Trip.
router.delete("/:id/delete", tripController.tripDelete);

// PATCH request to update Trip.
router.patch(
  "/:id/update",
  authenticateJWT,
  validateInputs(tripUpdateSchema),
  tripController.tripUpdate
);

// GET request for one Trip.
router.get("/:id", tripController.tripDetail);

// GET request for list of all Trips.
router.get("/", tripController.tripList);

// // GET request to delete Trip.
// router.get("/:id/delete", tripController.tripDelete);

// GET request to update Trip.
// router.get("/:id/update", tripController.tripUpdate);

// GET request for creating a Trip. NOTE This must come before routes that display Trip (uses id).
// router.get("/create", tripController.tripCreate);
