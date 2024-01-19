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

module.exports = router;

// PASSENGER ROUTES --> /api/passengers/trips/...

/* POST request to REQUEST to join a trip */
router.post("/:tripId/join", authenticate, passengerController.requestToJoin);

/* DELETE to CANCEL own trip join request */
router.delete(
  "/:tripId/join",
  authenticate,
  passengerController.cancelJoinRequest
);

/* PATCH request to RESPOND a passenger's request to join a trip */
router.patch(
  "/:tripId/join/:passengerUsername/respond",
  authenticate,
  ensureNotTripOwner,
  passengerController.respondToJoinRequest
);
