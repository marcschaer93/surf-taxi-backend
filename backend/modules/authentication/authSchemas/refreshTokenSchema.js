const refreshTokenSchema = {
  refreshToken: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid refersh token.",
      options: {
        pattern: /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/,
      },
    },
  },

  // Additional check to disallow unexpected properties
  unexpectedProperties: {
    custom: {
      options: (value, { req }) => {
        const allowedProperties = Object.keys(refreshTokenSchema);
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

module.exports = { refreshTokenSchema };
