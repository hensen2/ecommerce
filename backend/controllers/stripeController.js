const catchAsync = require("../utils/catchAsync");
const { stripeService } = require("../services/index");

/**
 * @desc      Fulfill Order Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @return    { JSON } - A JSON object representing the type, and message
 */
const fulfillOrder = catchAsync(async (req, res, next) => {
  // 1) Fulfill order
  const { type, message, statusCode } = await stripeService.fulfillOrder(req);

  // 2) Check if there is an error
  if (type === "Error") {
    next({ message, statusCode });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
  });
});

module.exports = {
  fulfillOrder,
};
