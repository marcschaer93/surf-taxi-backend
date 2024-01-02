const tripController = require("./tripController");

const express = require("express");
const router = express.Router();
const validateInputs = require("../../middleware/validateInputs");
const tripNewSchema = require("./tripNewSchema.json");

module.exports = router;

/// TRIP ROUTES ///

// GET trips home page.
// router.get("/", tripController.index);

// GET request for creating a Trip. NOTE This must come before routes that display Trip (uses id).
router.get("/create", tripController.tripCreateGet);

// POST request for creating Trip.
router.post(
  "/create",
  validateInputs(tripNewSchema),
  tripController.tripCreatePost
);

// GET request to delete Trip.
router.get("/:id/delete", tripController.tripDeleteGet);

// POST request to delete Trip.
router.post("/:id/delete", tripController.tripDeletePost);

// GET request to update Trip.
router.get("/:id/update", tripController.tripUpdateGet);

// POST request to update Trip.
router.post("/:id/update", tripController.tripUpdatePost);

// GET request for one Trip.
router.get("/:id", tripController.tripDetail);

// GET request for list of all Trips.
router.get("/", tripController.tripList);
