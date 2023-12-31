// This middleware helps to catch any errors that occur within the handler and forwards them to the Express error-handling middleware via next(). Without try...catch block. No next keyword needed
const asyncHandler = require("express-async-handler");
const jsonschema = require("jsonschema");

const UserApi = require("./userModel");
const userNewSchema = require("./userNewSchema.json");

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

// Handle Trip create on POST.
exports.userCreatePost = asyncHandler(async (req, res, next) => {
  const newUserData = req.body;
  const validator = jsonschema.validate(newUserData, userNewSchema);
  if (!validator.valid) {
    const errors = validator.errors.map((e) => e.stack);
    throw new BadRequestError(errors);
  }

  const result = await UserApi.createUser(newUserData);
  res.json({ result });
});

// Handle Trip create on POST.
// exports.trip_create_post = asyncHandler(async (req, res, next) => {
//     const newTripData = req.body;
//     const validator = jsonschema.validate(newTripData, tripNewSchema);
//     if (!validator.valid) {
//       const errors = validator.errors.map((e) => e.stack);
//       throw new BadRequestError(errors);
//     }

//     const result = await TripApi.createTrip(newTripData);
//     res.json({ result });
//   });
