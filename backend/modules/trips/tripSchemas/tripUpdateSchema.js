const { parseISO, isValid } = require("date-fns");

const tripUpdateSchema = {
  //   date: {
  //     in: ["body"],
  //     isString: {
  //       errorMessage: "Please provide a valid date.",
  //     },
  //     toDate: true, // Convert the date string to a JavaScript Date object
  //     optional: true, // This property is optional
  //   },
  date: {
    in: ["body"],
    custom: {
      options: (value) => {
        const parsedDate = parseISO(value);
        return isValid(parsedDate);
      },
      errorMessage:
        "Please provide a valid date in ISO 8601 format: 2023-03-20T23:15:30",
    },
    optional: true, // This property is optional
  },
  start_location: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid start location.",
    },
    optional: true, // This property is optional
  },
  destination: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid destination.",
    },
    optional: true, // This property is optional
  },
  stops: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide valid stops information.",
    },
    optional: true, // This property is optional
  },
  travel_info: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide valid travel information.",
    },
    optional: true, // This property is optional
  },
  costs: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide valid cost information.",
    },
    optional: true, // This property is optional
  },
  seats: {
    in: ["body"],
    isInt: {
      options: { min: 0 }, // Assuming seats cannot be negative
      errorMessage: "Please provide a valid number of seats.",
    },
    optional: true, // This property is optional
  },

  // Additional check to disallow unexpected properties
  unexpectedProperties: {
    custom: {
      options: (value, { req }) => {
        const allowedProperties = Object.keys(tripUpdateSchema);
        const unexpectedProps = Object.keys(req.body).filter(
          (prop) => !allowedProperties.includes(prop)
        );

        if (unexpectedProps.length > 0) {
          throw new Error(
            `Unexpected properties found: ${unexpectedProps.join(", ")}`
          );
        }

        return true;
      },
    },
  },
  // Check if req.body is not empty
  checkEmptyBody: {
    custom: {
      options: (value, { req }) => {
        if (Object.keys(req.body).length === 0) {
          throw new Error("At least one property in req.body is required.");
        }
        return true;
      },
    },
  },
};

module.exports = { tripUpdateSchema };
