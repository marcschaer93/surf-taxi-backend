const { checkSchema, validationResult } = require("express-validator");

const { BadRequestError, ValidationError } = require("../helpers/expressError");

/** Input validator using express-validator */

const validateInputs = (schema) => async (req, res, next) => {
  try {
    // Run schema validation with checkSchema
    await checkSchema(schema).run(req);
    // Run validation with check
    // await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateInputs };
