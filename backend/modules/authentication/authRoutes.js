const express = require("express");

const router = express.Router();
const authController = require("./authController.js");
const { validateInputs } = require("../../middleware/validateInputs.js");
const userRegisterSchema = require("./userRegisterSchema.json");
const userAuthSchema = require("./userAuthSchema.json");
const refreshTokenSchema = require("./refreshTokenSchema.json");

// export our router to be mounted by the parent application
module.exports = router;

// AUTH ROUTES

// POST request for creating User with valid registration inputs.
router.post(
  "/register",
  validateInputs(userRegisterSchema),
  authController.authRegister
);

// POST request for access- and refreshToken if valid {username, password}.
router.post("/token", validateInputs(userAuthSchema), authController.authUser);

// Route to refresh accessToken with refreshToken if accessToken has expired
router.post(
  "/refresh-token",
  validateInputs(refreshTokenSchema),
  authController.refreshToken
);
