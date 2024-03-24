const { UnauthorizedError, ExpressError } = require("../helpers/expressError");

/** Middleware: Authorize user role. */

const authorize = (requiredRole) => (req, res, next) => {
  const userRole = req.role;

  if (userRole === requiredRole) {
    next();
  } else {
    throw new UnauthorizedError(
      `You do not have access with your current role (${userRole}). Required role is ${requiredRole}.`
    );
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

/** Middleware: Requires not tripOwner. */

const ensureNotTripOwner = (req, res, next) => {
  try {
    if (req.username === req.params.passengerUsername)
      throw new UnauthorizedError(
        "You are the trip owner and cannot perform this action."
      );
    return next();
  } catch (err) {
    return next(err);
  }
};

/** Middleware: Requires logged in and admin role. */

const ensureAdmin = (req, res, next) => {
  try {
    if (!req.username || req.role === "admin") throw new UnauthorizedError();

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = { authorize, ensureCorrectUser, ensureNotTripOwner };
