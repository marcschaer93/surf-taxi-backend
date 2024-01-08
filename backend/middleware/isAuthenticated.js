const jwt = require("jsonwebtoken");
const { UnauthorizedError, ExpressError } = require("../expressError");

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
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const tokenExp = payload.exp;

    // Calculate a threshold time (e.g., 1 minute before expiration)
    const thresholdTime = tokenExp - 15; // 1 minute before expiration

    // If the current time is past the threshold time, return 401
    if (currentTime >= thresholdTime) {
      // return res.status(401).json({ error: "Token is soon to expire" });
      throw new ExpressError("Token is soon to expire", 401);
    }

    // if (payload.exp <= currentTime) {
    //   req.username = null;
    //   throw new ExpressError(401, "Unauthorized: Token expired");
    // }

    req.username = payload.username;
    // req.curr_admin = payload.admin;

    return next();
  } catch (err) {
    return next(err);
  }
};

/** Middleware: Requires user is authenticated. */

// function ensureLoggedIn(req, res, next) {
//   try {
//     console.log("req.username req", req.username);
//     if (!req.username) throw new UnauthorizedError();
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// }

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
