// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const AuthApi = require("../authentication/authModel");
const { BadRequestError, ExpressError } = require("../../helpers/expressError");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../helpers/tokens");

exports.authRegister = asyncHandler(async (req, res, next) => {
  const newUser = await AuthApi.register(req.body);

  const accessToken = generateAccessToken(newUser.username);
  const refreshToken = generateRefreshToken(newUser.username);

  res.json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: newUser,
  });
});

exports.authUser = asyncHandler(async (req, res, next) => {
  const user = await AuthApi.authenticate(req.body);

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

  const payload = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const { username } = payload;
  const newAccessToken = generateAccessToken(username);

  res.json({ accessToken: newAccessToken });
});
