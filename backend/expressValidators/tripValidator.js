// // tripValidator.js
// const { body, validationResult } = require("express-validator");

// exports.tripValidation = [
//   body("start_location")
//     .isString()
//     .notEmpty()
//     .withMessage("Start location is required"),
//   body("date").isDate().withMessage("Please provide a valid date (YYYY-MM-DD)"),
//   body("destination")
//     .isString()
//     .notEmpty()
//     .withMessage("Destination is required"),
//   body("stops").isString().optional(),
//   body("trip_info").isString().notEmpty().withMessage("Trip info is required"),
//   body("costs").isString().notEmpty().withMessage("Costs are required"),
//   body("seats").isInt().notEmpty().withMessage("Seats must be a number"),
//   body("user_id").isInt().notEmpty().withMessage("User ID must be a number"),
// ];
