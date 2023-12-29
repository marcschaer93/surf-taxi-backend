const express = require("express");
const userRoutes = require("./modules/users");
const tripRoutes = require("./modules/trips/tripRoutes");

const app = express();

// Parse JSON-encoded bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Mounting the API routes
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
