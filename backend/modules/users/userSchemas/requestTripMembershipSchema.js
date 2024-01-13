const requestTripMembershipSchema = {
  // id: {
  //   in: ["query"],
  //   notEmpty: true,
  //   errorMessage: "Please provide a valid id in Query.",
  // },
  request_status: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid request_status.",
    },
    notEmpty: true,
    custom: {
      options: (value) => {
        const allowedStatusValues = [
          // "pending",
          // "approved",
          // "rejected",
          "requested",
          // "owner",
        ];
        if (!allowedStatusValues.includes(value)) {
          throw new Error(
            `Invalid request_status. Allowed values: ${allowedStatusValues.join(
              ", "
            )}`
          );
        }
        return true;
      },
    },
  },

  // Additional check to disallow unexpected properties
  unexpectedProperties: {
    custom: {
      options: (value, { req }) => {
        const allowedProperties = Object.keys(userRequestTripSchema);
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

module.exports = { requestTripMembershipSchema };
