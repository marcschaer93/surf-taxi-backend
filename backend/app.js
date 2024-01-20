const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./modules/authentication/authRoutes");
const userRoutes = require("./modules/users/userRoutes");
const tripRoutes = require("./modules/trips/tripRoutes");
const passengerRoutes = require("./modules/passengers/passengerRoutes");
const { authenticateJWT } = require("./middleware/authenticate");
const {
  handle404Error,
  handleGenericError,
} = require("./middleware/errorHandler");

const app = express();

// Use cookie-parser middleware
// app.use(cookieParser());

// Parse JSON-encoded bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Mounting the API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/passengers/trips", passengerRoutes);

// /** Handle 404 errors -- this matches everything */
app.use(handle404Error);

/** Generic error handler; anything unhandled goes here. */
app.use(handleGenericError);

module.exports = app;
