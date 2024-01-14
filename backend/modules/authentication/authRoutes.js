const express = require("express");

const router = express.Router();
const authController = require("./authController.js");
const { validateInputs } = require("../../middleware/validateInputs.js");
const { authRegisterSchema } = require("./authSchemas/authRegisterSchema.js");
const { authLoginSchema } = require("./authSchemas/authLoginSchema.js");
const { refreshTokenSchema } = require("./authSchemas/refreshTokenSchema.js");

// export our router to be mounted by the parent application
module.exports = router;

// AUTH ROUTES

// POST request for creating User with valid registration inputs.
router.post(
  "/register",
  validateInputs(authRegisterSchema),
  authController.registerOneUser
);

// POST request for access- and refreshToken if valid {username, password}.
router.post(
  "/login",
  validateInputs(authLoginSchema),
  authController.loginOneUser
);

// Route to refresh accessToken with refreshToken if accessToken has expired
router.post(
  "/refresh-token",
  validateInputs(refreshTokenSchema),
  authController.createNewRefreshToken
);
