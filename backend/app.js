const express = require("express");
const userRoutes = require("./modules/users");
const tripRoutes = require("./modules/trips/tripRoutes");
const { NotFoundError } = require("./expressError");
require("colors");

const app = express();

// Parse JSON-encoded bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Mounting the API routes
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error("ERROR".red, err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
