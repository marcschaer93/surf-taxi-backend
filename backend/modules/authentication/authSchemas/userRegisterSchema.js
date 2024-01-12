const userRegisterSchema = {
  username: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Please provide a valid username.",
  },
  password: {
    in: ["body"],
    isString: true,
    isLength: {
      options: { min: 5, max: 20 },
    },
    errorMessage: "Password must be between 5 and 20 characters.",
  },
  first_name: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Please provide a valid first name.",
  },
  birth_year: {
    in: ["body"],

    isInt: {
      options: { min: 1900, max: new Date().getFullYear() },
    },
    toInt: true,
    errorMessage: "Please provide a valid birth year.",
  },

  // ... (other fields)
  role: {
    in: ["body"],
    isString: true,
    isIn: {
      options: [["user", "admin"]],
    },
    default: "user", // Default value if 'role' is not provided
    errorMessage: "Invalid user role.",
  },
};

// const { validationResult, check } = require("express-validator");

// Example validations
// const userRegisterSchema2 = [
//   check("username")
//     .isString()
//     .notEmpty()
//     .withMessage("Please provide a valid username."),
//   check("password")
//     .isString()
//     .isLength({ min: 5, max: 20 })
//     .withMessage("Password must be between 5 and 20 characters."),
//   check("first_name")
//     .isString()
//     .notEmpty()
//     .withMessage("Please provide a valid first name."),
//   check("birth_year")
//     .isInt({ min: 1900, max: new Date().getFullYear() })
//     .withMessage("Please provide a valid birth year."),

//   // Add more validations for other fields
// ];

module.exports = { userRegisterSchema };
