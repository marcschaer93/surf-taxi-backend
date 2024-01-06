const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authenticate user using cookies. */

//$$
// Define an array of routes that do not require authentication
// const nonAuthRoutes = ["/public", "/login", "/signup"];

const authenticateJWT = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token; // Access the access token from the cookies
    console.log("accessToken", accessToken);

    // $$
    // Skip authentication for non-auth routes
    // if (nonAuthRoutes.includes(req.path)) {
    //   return next();
    // }

    // Its not a Error without valid token

    // if (!accessToken) {
    //   // Unauthorized
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthorized: Missing access token" });
    // }

    if (accessToken) {
      const payload = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

      req.username = payload.username;
      // req.curr_admin = payload.admin;
    }

    return next();
  } catch (err) {
    console.error(err);
  }
};

/** Middleware: Requires user is authenticated. */

function ensureLoggedIn(req, res, next) {
  try {
    if (!req.username) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware: Requires correct username. */

const ensureCorrectUser = (req, res, next) => {
  try {
    if (req.username !== req.params.username) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = { authenticateJWT, ensureCorrectUser, ensureLoggedIn };
