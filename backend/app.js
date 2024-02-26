const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./modules/authentication/authRoutes");
const userRoutes = require("./modules/users/userRoutes");
const tripRoutes = require("./modules/trips/tripRoutes");
const reservationRoutes = require("./modules/reservations/reservationRoutes");
const { authenticateJWT } = require("./middleware/authenticate");
const {
  handle404Error,
  handleGenericError,
} = require("./middleware/errorHandler");

const app = express();

// Parse JSON-encoded bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

/**  see/test incoming request */
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.path}`);
//   next();
// });

// Mounting the API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/reservations", reservationRoutes);

// /** Handle 404 errors -- this matches everything */
app.use(handle404Error);

/** Generic error handler; anything unhandled goes here. */
app.use(handleGenericError);

module.exports = app;
