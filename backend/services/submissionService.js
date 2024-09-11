const catchAsync = require("../utils/catchAsync");
const { Submission } = require("../models/index");

/**
 * @desc    Create New Submission
 * @param  { String } name - Form last name
 * @param  { String } email - Form email address
 * @param  { String } phone - Form phone number (optional)
 * @param  { String } subject - Form subject
 * @param  { String } message - Form message
 * @returns { Object<type|message|statusCode> }
 */
const createSubmission = catchAsync(
  async (name, email, phone, subject, message) => {
    await Submission.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return {
      type: "success",
      message: "successSubmissionCreated",
      statusCode: 201,
    };
  }
);

module.exports = {
  createSubmission,
};
