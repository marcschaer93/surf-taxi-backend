const jwt = require("jsonwebtoken");
// Middleware for error handling in async functions without explicit try-catch blocks.
const asyncHandler = require("express-async-handler");

const AuthApi = require("../authentication/authModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../helpers/jwtTokens");

/**
 * Processes user registration, generating access and refresh tokens upon successful registration.
 */
exports.registerUser = asyncHandler(async (req, res, next) => {
  const newRegisteredUser = await AuthApi.registerUser(req.body);

  const accessToken = generateAccessToken(newRegisteredUser);
  const refreshToken = generateRefreshToken(newRegisteredUser);

  res.status(201).json({
    success: true,
    data: {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: newRegisteredUser,
    },
  });
});

/**
 * Authenticates a user and provides new access and refresh tokens upon successful login.
 */
exports.loginUser = asyncHandler(async (req, res, next) => {
  const loggedInUser = await AuthApi.loginUser(req.body);

  const accessToken = generateAccessToken(loggedInUser);
  const refreshToken = generateRefreshToken(loggedInUser);

  console.log("loggedInuser", loggedInUser);

  res.status(200).json({
    success: true,
    data: {
      accessToken,
      refreshToken,
      loggedInUser,
    },
  });
});

/**
 * Generates a new access token using a valid refresh token.
 */
exports.createNewRefreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  const payload = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const { username } = payload;
  const newAccessToken = generateAccessToken(username);

  res
    .status(200)
    .json({ success: true, data: { accessToken: newAccessToken } });
});
