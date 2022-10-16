const createError = require("../helpers/createError");

const validate = (schema) => {
  const func = (req, res, next) => {
    const body = req.body;
    console.log("req.body is", body);
    const { error } = schema.validate(body);
    if (error) {
      next(createError(400, "Bad request"));
    }
    next();
  };
  return func;
};

module.exports = validate;
