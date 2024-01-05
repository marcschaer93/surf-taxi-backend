// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const UserApi = require(".././users/userModel");
const { BadRequestError } = require("../../expressError");

// Handle User registration on POST.
// exports.authRegisterPost = asyncHandler(async (req, res, next) => {
//   const newUserData = req.body;

//   const result = await UserApi.register(newUserData);
//   res.json({ result });
// });

exports.authRegisterPost = asyncHandler(async (req, res, next) => {
  const newUserData = req.body;

  // Register user using data from req.body
  const result = await UserApi.register(newUserData);
  console.log({ result });

  const newUser = result.newUser;

  // Generate Access Token
  const accessToken = jwt.sign(
    { username: newUser.username },
    process.env.ACCESS_TOKEN_SECRET
  );

  // Generate Refresh Token
  const refreshToken = jwt.sign(
    { username: newUser.username },
    process.env.REFRESH_TOKEN_SECRET
  );

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});
