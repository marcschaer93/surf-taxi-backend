// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const AuthApi = require("../authentication/authModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../helpers/jwtTokens");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const newUser = await AuthApi.registerUser(req.body);

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  res.status(201).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: newUser,
  });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const user = await AuthApi.loginUser(req.body);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user,
  });
});

exports.refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  const payload = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const { username } = payload;
  const newAccessToken = generateAccessToken(username);

  res.status(200).json({ accessToken: newAccessToken });
});
