const authLoginSchema = {
  username: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid username.",
    },
    isLength: {
      options: { min: 1, max: 30 },
      errorMessage: "Username must be between 1 and 30 characters.",
    },
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid password.",
    },
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage: "Password must be between 5 and 20 characters.",
    },
  },

  // STRONG PASSWORD

  //   password: {
  //     in: ["body"],
  //     isStrongPassword: {
  //       errorMessage:
  //         "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  //       options: {
  //         minLength: 8,
  //         minLowercase: 1,
  //         minUppercase: 1,
  //         minNumbers: 1,
  //       },
  //     },
  //   },

  // Additional check to disallow unexpected properties
  unexpectedProperties: {
    custom: {
      options: (value, { req }) => {
        const allowedProperties = Object.keys(authLoginSchema);
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

module.exports = { authLoginSchema };
