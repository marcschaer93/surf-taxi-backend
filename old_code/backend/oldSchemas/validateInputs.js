const jsonschema = require("jsonschema");
const { BadRequestError } = require("../../../backend/helpers/expressError"); // Your error handling logic

const validateInputs = (schema) => {
  return (req, res, next) => {
    // const data = dataKey ? req[dataKey] : req.body; // Allows specifying different data sources

    const validator = jsonschema.validate(req.body, schema);
    if (!validator.valid) {
      const errors = validator.errors.map((e) => e.stack);
      return next(new BadRequestError(errors));
    }
    next();
  };
};

module.exports = { validateInputs };
