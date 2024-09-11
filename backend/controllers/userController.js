const Joi = require("joi");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services/index");

/**
 * @desc      Login User Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.body.username - Login username
 * @property  { String } req.body.password - Login password
 * @returns   { JSON } - A JSON object representing the type and status message
 */
const loginUser = catchAsync(async (req, res, next) => {
  // 1) Validate body data
  const schema = Joi.object({
    username: Joi.string().lowercase().trim().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate({
    username: req.body.username,
    password: req.body.password,
  });

  // 2) Attempt user login
  let result;
  if (!error) {
    result = await userService.loginUser(value.username, value.password);
  } else {
    next(error);
  }

  const { type, message, statusCode } = result;

  // 3) If everything is OK, send data
  if (type === "success") {
    return res.status(statusCode).json({
      type,
      message,
    });
  }

  // 4) Handle error
  next({ message, statusCode });
});

module.exports = {
  loginUser,
};
