const jsonschema = require("jsonschema");
const { BadRequestError } = require("./errors"); // Your error handling logic

function validateInputs(data, schema) {
  return (req, res, next) => {
    // const data = req.body; // Assuming data is in the request body

    const validator = jsonschema.validate(data, schema);

    if (!validator.valid) {
      const errors = validator.errors.map((error) => error.stack);
      return next(new BadRequestError(errors));
    }

    next();
  };
}

module.exports = validateInputs;
