const { body } = require("express-validator");

exports.validateTripCreate = [
  body("start_point").notEmpty().withMessage("Start point is required"),
  body("end_point").notEmpty().withMessage("End point is required"),
  body("seats")
    .isInt({ min: 0 })
    .withMessage("Seats must be a positive integer"),
  // Other validation rules...
];

exports.validateTripUpdate = [
  // Validation rules for updating a trip...
];
