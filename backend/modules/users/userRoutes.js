const express = require("express");

const router = express.Router();
const db = require("../../db/db.js");
const userController = require("./userController.js");

// export our router to be mounted by the parent application
module.exports = router;

// USER ROUTES

// GET request for all Users.
router.get("/", userController.userList);

// GET request for one User
router.get("/:username", userController.userDetail);

// POST request for creating User.
router.post("/create", userController.userCreatePost);
