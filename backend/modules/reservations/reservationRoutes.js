const express = require("express");
const router = express.Router();

const db = require("../../db/index.js");
const reservationController = require("./reservationController.js");
const { authenticate } = require("../../middleware/authenticate.js");
const {
  ensureCorrectUser,
  authorize,
  ensureNotTripOwner,
} = require("../../middleware/authorize.js");

const { validateInputs } = require("../../middleware/validateInputs.js");

/// RESERVATION ROUTES --> /api/reservations/... ///

// Get all reservations for a specific trip
router.get(
  "/:tripId",
  authenticate,
  reservationController.getAllTripReservations
);

// Request to join a trip (creates new reservation)
router.post(
  "/:tripId",
  authenticate,
  reservationController.createNewReservation
);

// Updates reservation  (Response by trip owner or admin)
router.put(
  "/:tripId",
  authenticate,
  reservationController.updateOneReservation
);

// Cancel a previous request to join a trip (deletes own reservation)
router.delete(
  "/:tripId",
  authenticate,
  reservationController.deleteOneReservation
);

module.exports = router;
