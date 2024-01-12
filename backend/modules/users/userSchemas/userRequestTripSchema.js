const userRequestTripSchema = {
  id: {
    in: ["query"],
    notEmpty: true,
    errorMessage: "Please provide a valid id in Query.",
  },
};

module.exports = { userRequestTripSchema };
