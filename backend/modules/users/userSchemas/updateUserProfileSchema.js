const updateUserProfileSchema = {
  username: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid username.",
    },
    isLength: {
      options: { min: 1, max: 30 },
      errorMessage: "Username must be between 1 and 30 characters.",
    },
    optional: true,
  },
  // password: {
  //   in: ["body"],
  //   isString: {
  //     errorMessage: "Please provide a valid password.",
  //   },
  //   isLength: {
  //     options: { min: 5, max: 20 },
  //     errorMessage: "Password must be between 5 and 20 characters.",
  //   },
  //   optional: true,
  // },

  // STRONG PASSWORD

  // password: {
  //   in: ["body"],
  //   isStrongPassword: {
  //     errorMessage:
  //       "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  //     options: {
  //       minLength: 8,
  //       minLowercase: 1,
  //       minUppercase: 1,
  //       minNumbers: 1,
  //     },
  //   },
  // },

  firstName: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid first name.",
    },
    optional: true,
  },
  lastName: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid last name.",
    },
    optional: true,
  },
  email: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid email address.",
    },
    isEmail: {
      errorMessage: "Invalid email address.",
    },
    optional: true,
  },
  gender: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid gender.",
    },
    optional: true,
  },
  birthYear: {
    in: ["body"],
    isInt: {
      options: { min: 1900, max: new Date().getFullYear() },
      errorMessage: "Please provide a valid birth year.",
    },
    toInt: true,
    optional: true,
  },
  phone: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid phone number.",
    },
    optional: true,
  },
  country: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid country.",
    },
    optional: true,
  },
  languages: {
    in: ["body"],
    isArray: {
      errorMessage: "Languages must be an array.",
    },
    custom: {
      options: (value) =>
        Array.isArray(value) && value.every((item) => typeof item === "string"),
      errorMessage: "Each language in the array must be a string.",
    },
    optional: true,
  },
  profileImgUrl: {
    in: ["body"],
    isURL: {
      errorMessage: "Please provide a valid URL for the profile image.",
    },
    optional: true,
  },
  bio: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid bio.",
    },
    optional: true,
  },

  // Additional check to disallow unexpected properties
  unexpectedProperties: {
    custom: {
      options: (value, { req }) => {
        const allowedProperties = Object.keys(updateUserProfileSchema);
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

module.exports = { updateUserProfileSchema };
