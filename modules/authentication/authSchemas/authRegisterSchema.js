const authRegisterSchema = {
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
  },
  lastName: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid last name.",
    },
  },
  email: {
    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid email address.",
    },
    isEmail: {
      errorMessage: "Invalid email address.",
    },
  },
  gender: {
    optional: true,

    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid gender.",
    },
  },
  birthYear: {
    optional: true,

    in: ["body"],
    isInt: {
      options: { min: 1900, max: new Date().getFullYear() },
      errorMessage: "Please provide a valid birth year.",
    },
    toInt: true,
  },
  phone: {
    optional: true,

    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid phone number.",
    },
  },
  country: {
    optional: true,

    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid country.",
    },
  },
  languages: {
    optional: true,

    in: ["body"],
    isArray: {
      errorMessage: "Languages must be an array.",
    },
    custom: {
      options: (value) =>
        Array.isArray(value) && value.every((item) => typeof item === "string"),
      errorMessage: "Each language in the array must be a string.",
    },
  },
  profileImgUrl: {
    optional: true,

    in: ["body"],
    isURL: {
      errorMessage: "Please provide a valid URL for the profile image.",
    },
  },
  bio: {
    optional: true,

    in: ["body"],
    isString: {
      errorMessage: "Please provide a valid bio.",
    },
  },
  role: {
    optional: true,

    in: ["body"],
    isString: {
      errorMessage: "Invalid user role.",
    },
    isIn: {
      options: [["user", "admin"]],
      errorMessage: "Invalid user role.",
    },
    // optional: { options: { nullable: true } }, // To make it optional
    default: "user",
  },
  // Additional check to disallow unexpected properties
  unexpectedProperties: {
    custom: {
      options: (value, { req }) => {
        const allowedProperties = Object.keys(authRegisterSchema);
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

module.exports = { authRegisterSchema };

// "examples": [
//   {
//     "username": "marcschaer",
//     "first_name": "marc",
//     "last_name": "schaer",
//     "email": "marc.schaer93@gmail.com",
//     "gender": "male",
//     "birth_year": 1993,
//     "phone": "+41798490968",
//     "country": "switzerland",
//     "languages": ["german", "english", "french"],
//     "profile_img_url": "google.com",
//     "bio": "surfer",
//     "role": "user"
//   }
// ]
