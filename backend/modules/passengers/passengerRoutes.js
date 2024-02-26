const express = require("express");
const router = express.Router();

const db = require("../../db");
const passengerController = require("./passengerController.js");
const { authenticate } = require("../../middleware/authenticate.js");
const {
  ensureCorrectUser,
  authorize,
  ensureNotTripOwner,
} = require("../../middleware/authorize.js");

const { validateInputs } = require("../../middleware/validateInputs.js");

// PASSENGER ROUTES --> /api/passengers/trips/...

// Get all passengers for a specific trip
router.get("/:tripId", authenticate, passengerController.getTripPassengers);
// router.get("/:tripId", authenticate, reservationController.getAllTripReservations);

// Request to join a trip as a passenger
router.post("/:tripId/join", authenticate, passengerController.requestToJoin);

// /api/reservations/:tripId/:username
// router.post("/:tripId/:username", authenticate, reservationController.createNewReservation);

// Cancel a previous request to join a trip
router.delete(
  "/:tripId/join",
  authenticate,
  passengerController.cancelJoinRequest
);

// /api/reservations/:tripId/:username

// router.delete(
//   "/:tripId/:username",
//   authenticate,
// reservationController.deleteReservation
// );

// Update the status of a passenger's trip join request (Response by trip owner or admin)
router.put(
  "/:tripId/:passengerUsername/status",
  authenticate,
  passengerController.updatePassengerStatus
);

// /api/reservations/:tripId/:username

// router.put(
//   "/:tripId/:passengerUsername/status",
//   authenticate,
//   reservationController.updateReservationStatus
// );

module.exports = router;

//
//
/* PATCH request to RESPOND a passenger's request to join a trip */
// router.patch(
//   "/:tripId/join/:passengerUsername/respond",
//   authenticate,
//   ensureNotTripOwner,
//   passengerController.respondToJoinRequest
// );
