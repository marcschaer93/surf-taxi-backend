const createNewTripMemberRequestSchema = {
  // id: {
  //   in: ["query"],
  //   notEmpty: true,
  //   errorMessage: "Please provide a valid id in Query.",
  // },
  // memberStatus: {
  //   in: ["body"],
  //   isString: {
  //     errorMessage: "Please provide a valid memberStatus.",
  //   },
  //   notEmpty: true,
  //   custom: {
  //     options: (value) => {
  //       const allowedStatusValues = [
  //         // "pending",
  //         // "approved",
  //         // "rejected",
  //         "requested",
  //         // "owner",
  //       ];
  //       if (!allowedStatusValues.includes(value)) {
  //         throw new Error(
  //           `Invalid request_status. Allowed values: ${allowedStatusValues.join(
  //             ", "
  //           )}`
  //         );
  //       }
  //       return true;
  //     },
  //   },
  // },

  // Additional check to disallow unexpected properties
  unexpectedProperties: {
    custom: {
      options: (value, { req }) => {
        const allowedProperties = Object.keys(createNewTripMemberRequestSchema);
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

module.exports = { createNewTripMemberRequestSchema };
