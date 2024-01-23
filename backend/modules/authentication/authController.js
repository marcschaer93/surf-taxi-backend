// ASYNCHANDLER - This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. This then sends the error to client.
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const AuthApi = require("../authentication/authModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../helpers/jwtTokens");

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
