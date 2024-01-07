// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const UserApi = require(".././users/userModel");
const { BadRequestError, ExpressError } = require("../../expressError");
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

  const accessToken = generateAccessToken(newUser.username);
  const refreshToken = generateRefreshToken(newUser.username);

  res.json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: newUser,
  });
});

exports.authUser = asyncHandler(async (req, res, next) => {
  const user = await UserApi.authenticate(req.body);

  if (!user) {
    throw new ExpressError(401, "Invalid credentials.");
  }

  const accessToken = generateAccessToken(user.username);
  const refreshToken = generateRefreshToken(user.username);

  res.json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user,
  });
});

exports.refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new ExpressError(401, "No refresh token provided");

  const payload = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  console.log("payload", payload.username);
  const { username } = payload;

  const newAccessToken = generateAccessToken(username);

  res.json({ accessToken: newAccessToken });
});
