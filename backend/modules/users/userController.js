// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");

const UserApi = require("./userModel");
const { BadRequestError } = require("../../expressError");

// Displays list of all Users.
exports.userList = asyncHandler(async (req, res, next) => {
  const users = await UserApi.getAllUsers();
  if (!users) return res.send(`User List is empty!`);
  res.json({ users });
});

// Displays detail page for a specific User
exports.userDetail = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  const user = await UserApi.getUser(username);
  res.json(user);
});

// Handle User registration on POST.
// exports.userRegisterPost = asyncHandler(async (req, res, next) => {
//   const newUserData = req.body;
//   const result = await UserApi.register(newUserData);
//   res.json({ result });
// });
