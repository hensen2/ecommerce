const Joi = require("joi");
const catchAsync = require("../utils/catchAsync");
const { submissionService } = require("../services/index");

/**
 * @desc      Create New Submission Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.body.firstName - Form first name
 * @property  { String } req.body.lastName - Form last name
 * @property  { String } req.body.email - Form email address
 * @property  { String } req.body.phone - Form phone number (optional)
 * @property  { String } req.body.subject - Form subject
 * @property  { String } req.body.message - Form message
 * @returns   { JSON } - A JSON object representing the type and status message
 */
const createSubmission = catchAsync(async (req, res, next) => {
  // 1) Validate form data
  const schema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().trim().lowercase().email().required(),
    phone: Joi.string().trim().allow("").optional(),
    subject: Joi.string().required(),
    message: Joi.string().trim().required(),
  });

  const { firstName, lastName, email, phone, subject, message } = req.body;
  const { error, value } = schema.validate({
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
  });

  // 2) Handle validation error
  if (error) {
    next(error);
  }

  // 3) Create contact form submission
  const name = `${value.firstName} ${value.lastName}`;
  const result = await submissionService.createSubmission(
    name,
    value.email,
    value.phone,
    value.subject,
    value.message
  );

  // 3) If success, send data
  return res.status(result.statusCode).json({
    type: result.type,
    message: result.message,
  });
});

module.exports = {
  createSubmission,
};
