const { validationResult, body } = require("express-validator");

exports.validateTripCreate = [
  body("start_point")
    .notEmpty()
    .withMessage("Start point is required")
    .isString()
    .withMessage("Start point must be a string"),
  body("end_point")
    .notEmpty()
    .withMessage("End point is required")
    .isString()
    .withMessage("Start point must be a string"),
  body("seats")
    .isInt({ min: 0 })
    .withMessage("Seats must be a positive integer"),
  // Other validation rules...
];

// const errors = validationResult(req);
// if (!errors.isEmpty()) {
//   const errorMessages = errors.array().map((error) => error.msg);
//   // return res.send({ errors: errors.array() });
//   throw new BadRequestError(errorMessages);
// }

exports.validateTripUpdate = [
  // Validation rules for updating a trip...
];
