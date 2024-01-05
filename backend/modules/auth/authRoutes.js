const express = require("express");

const router = express.Router();
const authController = require("./authController.js");
const { validateInputs } = require("../../middleware/validateInputs");
const userNewSchema = require("./userNewSchema.json");

// export our router to be mounted by the parent application
module.exports = router;

// AUTH ROUTES

// POST request for creating User.
router.post(
  "/register",
  validateInputs(userNewSchema),
  authController.authRegisterPost
);
