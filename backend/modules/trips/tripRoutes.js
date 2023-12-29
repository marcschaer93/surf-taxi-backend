const trip_controller = require("./tripController");
const { validateTripCreate } = require("./tripValidator");

const express = require("express");
const router = express.Router();

module.exports = router;

/// TRIP ROUTES ///

// GET trips home page.
// router.get("/", trip_controller.index);

// GET request for creating a Trip. NOTE This must come before routes that display Trip (uses id).
// router.get("/create", trip_controller.trip_create_get);

// POST request for creating Trip.
router.post("/create", validateTripCreate, trip_controller.trip_create_post);

// GET request to delete Trip.
// router.get("/:id/delete", trip_controller.trip_delete_get);

// POST request to delete Trip.
// router.post("/:id/delete", trip_controller.trip_delete_post);

// GET request to update Trip.
// router.get("/:id/update", trip_controller.trip_update_get);

// POST request to update Trip.
// router.post("/:id/update", trip_controller.trip_update_post);

// GET request for one Trip.
router.get("/:id", trip_controller.trip_detail);

// GET request for list of all Trips.
router.get("/", trip_controller.trip_list);
