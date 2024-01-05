// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const UserApi = require(".././users/userModel");
const { BadRequestError } = require("../../expressError");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../helpers/tokens");

exports.authRegisterPost = asyncHandler(async (req, res, next) => {
  const newUserData = req.body;

  // Register user using data from req.body
  const result = await UserApi.register(newUserData);
  console.log({ result });

  const newUser = result.newUser;

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

exports.authUserPost = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await UserApi.authenticate(username, password);
  console.log({ user });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});
