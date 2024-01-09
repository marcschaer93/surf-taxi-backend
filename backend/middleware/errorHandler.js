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

  return res.status(status).json({
    error: { message, status },
  });
};

module.exports = { handle404Error, handleGenericError };
