const Joi = require("joi");
const catchAsync = require("../utils/catchAsync");
const { subscriberService } = require("../services/index");

/**
 * @desc      Create New Subscriber Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.body.email - Form email address
 * @returns   { JSON } - A JSON object representing the type and status message
 */
const createSubscriber = catchAsync(async (req, res, next) => {
  // 1) Validate form data
  const schema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
  });

  const { error, value } = schema.validate({
    email: req.body.email,
  });

  // 2) Handle validation error
  if (error) {
    next(error);
  }

  // 3) Create new subscriber
  const { type, message, statusCode } =
    await subscriberService.createSubscriber(value.email);

  // 4) If success, send data
  return res.status(statusCode).json({
    type,
    message,
  });
});

module.exports = {
  createSubscriber,
};
