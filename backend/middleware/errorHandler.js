require("colors");
const { NotFoundError } = require("../helpers/expressError");

/** Handle 404 errors -- this matches everything */

const handle404Error = (req, res, next) => {
  return next(new NotFoundError());
};

/** Generic error handler; anything unhandled goes here. */

const handleGenericError = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error("ERROR".red, err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res
    .status(status)
    .json({ success: false, error: { message, code: status } });
};

// const errorHandler = (err, req, res, next) => {
//   let statusCode = 500; // Internal Server Error by default
//   let errorMessage = "Internal Server Error";

//   // Check if the error is an instance of ExpressError
//   if (err instanceof ExpressError) {
//     statusCode = err.status;
//     errorMessage = err.message;
//   }

//   // Log the error for debugging purposes
//   console.error(err);

//   // Send the error response to the client
//   res.status(statusCode).json({
//     success: false,
//     error: { message: errorMessage, code: statusCode },
//   });
// };

module.exports = { handle404Error, handleGenericError };
