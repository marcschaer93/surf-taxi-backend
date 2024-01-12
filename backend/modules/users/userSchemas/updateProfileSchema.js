const updateProfileSchema = {
  username: {
    in: ["body"],
    isString: true,
    optional: true,
    isLength: {
      options: { min: 1, max: 30 },
    },
    errorMessage: "Username must be a string and between 1 and 30 characters.",
  },
  password: {
    in: ["body"],
    isString: true,
    optional: true,
    isLength: {
      options: { min: 5, max: 20 },
    },
    errorMessage: "Password must be a string and between 5 and 20 characters.",
  },
  first_name: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "First name must be a string.",
  },
  last_name: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Last name must be a string.",
  },
  email: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Email must be a string.",
  },
  gender: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Gender must be a string.",
  },
  birth_year: {
    in: ["body"],
    isInt: {
      options: { min: 1900, max: new Date().getFullYear() },
    },
    toInt: true,
    optional: true,
    errorMessage:
      "Birth year must be a valid integer between 1900 and current Year.",
  },
  phone: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Phone must be a string.",
  },
  country: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Country must be a string.",
  },
  languages: {
    in: ["body"],
    isArray: true,
    optional: true,
    errorMessage:
      "Languages must be an array with at least one language provided.",
  },
  profile_img_url: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Profile image URL must be a string.",
  },
  bio: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Bio must be a string.",
  },
  role: {
    in: ["body"],
    isString: true,
    isIn: {
      options: [["user", "admin"]],
    },
    optional: true,
    errorMessage: "Invalid user role.",
  },
};

module.exports = { updateProfileSchema };
