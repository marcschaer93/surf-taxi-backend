const { parseISO, isValid } = require("date-fns");

const createTripSchema = {
  //   date: {
  //     in: ["body"],
  //     isString: {
  //       errorMessage: "Please provide a valid date.",
  //     },
  //     toDate: true, // Convert the date string to a JavaScript Date object
  //   },
  date: {
    in: ["body"],
    custom: {
      options: (value) => {
        const parsedDate = parseISO(value);
        return isValid(parsedDate);
      },
      errorMessage:
        "Please provide a valid timestamp in ISO 8601 format: 2023-03-20T23:15:30",
    },
  },
  start_location: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid start location.",
    },
  },
  destination: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid destination.",
    },
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
  },

  // Additional check to disallow unexpected properties
  unexpectedProperties: {
    custom: {
      options: (value, { req }) => {
        const allowedProperties = Object.keys(createTripSchema);
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
};

module.exports = { createTripSchema };
