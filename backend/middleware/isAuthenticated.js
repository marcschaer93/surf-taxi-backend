const jwt = require("jsonwebtoken");
const ExpressError = require(".././expressError");

/** Middleware: Authenticate user. */

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("authHeader", authHeader);
    // If authHeader, split it and get the token
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      // Unauthorized
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    const payload = await jwt.verify(token, SECRET_KEY);

    req.curr_username = payload.username;
    req.curr_admin = payload.admin;

    return next();
  } catch (err) {
    console.error(err);
    return next(new ExpressError("Unauthorized: Invalid token", 401));
  }
};

module.exports = { authenticateToken };
