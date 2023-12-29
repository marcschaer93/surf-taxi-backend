const express = require("express");
const userRoutes = require("./modules/users");

const app = express();

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
