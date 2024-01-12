const { checkSchema, validationResult } = require("express-validator");
const { BadRequestError, ValidationError } = require("../helpers/expressError");

const validateInputs2 = (schema) => async (req, res, next) => {
  try {
    // Run schema validation
    await checkSchema(schema).run(req);
    // await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //   const errorMessages = errors.array().map((error) => ({
      //     type: "field",
      //     value: undefined,
      //     msg: "Please provide a valid first name.",
      //     path: "first_name",
      //     location: "body",
      //   }));

      throw new ValidationError(errors.array());
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateInputs2 };
