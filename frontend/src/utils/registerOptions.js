export const registerOptions = {
  firstName: {
    required: "Please enter your name!",
    minLength: {
      value: 2,
      message: "must be at least 2 characters!",
    },
  },
  gender: {
    // required: "Plese choose gender!",
  },
  username: {
    required: "Enter username!",
    minLength: {
      value: 4,
      message: "must be at least 4 characters!",
    },
    maxLength: {
      value: 20,
      message: "must shorter than 16 characters!",
    },
  },
  password: {
    required: "Enter password!",
    minLength: {
      value: 5,
      message: "must be at least 6 characters!",
    },
    maxLength: {
      value: 20,
      message: "must shorter than 16 characters!",
    },
  },
  lastName: {
    required: "Enter your last name!",
  },
  email: {
    requires: "Please provide a valid email address.",
  },

  birthYear: {
    // requires: "Please provide a valid birth year.",
  },
  phone: {},
  country: {},
  languages: {},
  profileImgUrl: {},
  bio: {},
};
