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

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  res.json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: newUser,
  });
});

exports.authUserPost = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await UserApi.authenticate(username, password);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user,
  });
});

exports.refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new ExpressError(401, "No refresh token provided");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new ExpressError(403, "Invalid refresh token");
    }
  });

  console.log("refresh-token-user", user);

  const newAccessToken = generateAccessToken(user);

  res.json({ accessToken: newAccessToken });
});
