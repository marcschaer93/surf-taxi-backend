const express = require("express");

const router = express.Router();
const authController = require("./authController.js");
const { validateInputs } = require("../../middleware/validateInputs");
const userRegisterSchema = require("./userRegisterSchema.json");
const userAuthSchema = require("./userAuthSchema.json");

// export our router to be mounted by the parent application
module.exports = router;

// AUTH ROUTES

// POST request for creating User with valid registration inputs.
router.post(
  "/register",
  validateInputs(userRegisterSchema),
  authController.authRegisterPost
);

// POST request for new access- and refreshToken if valid {username, password}.
router.post(
  "/token",
  validateInputs(userAuthSchema),
  authController.authUserPost
);
