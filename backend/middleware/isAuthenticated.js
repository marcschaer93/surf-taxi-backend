const jwt = require("jsonwebtoken");
const { UnauthorizedError, ExpressError } = require("../helpers/expressError");

/** Middleware: Authenticate user using JWT. */

const authenticateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
      throw new ExpressError("Unauthorized: Access token missing", 401);
    }

    const payload = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const tokenExp = payload.exp;
    const username = payload.username;

    // Calculate a threshold time (e.g., 1 minute before expiration)
    const thresholdTime = tokenExp - 15; // 1 minute before expiration

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    // If the current time is past the threshold time, return 401
    if (currentTime >= thresholdTime) {
      throw new ExpressError("Token is soon to expire", 401);
    }

    req.username = username;
    // req.curr_admin = payload.admin;

    return next();
  } catch (err) {
    return next(err);
  }
};

/** Middleware: Requires correct username. */

const ensureCorrectUser = (req, res, next) => {
  try {
    if (req.username !== req.params.username) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = { authenticateJWT, ensureCorrectUser };
