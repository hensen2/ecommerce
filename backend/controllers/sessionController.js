const Joi = require("joi");
const catchAsync = require("../utils/catchAsync");
const { sessionService } = require("../services/index");

/**
 * @desc      Regen Client Session Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.session.cartId - Session Cart ID
 * @property  { String } req.session.orderId - Session Order ID
 * @return    { JSON } - A JSON object representing the type, and message
 */
const regenSession = catchAsync(async (req, res, next) => {
  // 1) Validate session data
  const schema = Joi.object({
    sessionCartId: Joi.string().hex(),
    sessionOrderId: Joi.string().hex(),
  });

  const { error, value } = schema.validate({
    sessionCartId: req.session.cartId,
    sessionOrderId: req.session.orderId,
  });

  // 2) Check session data
  let result;
  if (!error) {
    result = await sessionService.checkSession(
      value.sessionCartId,
      value.sessionOrderId
    );
  } else {
    next(error);
  }

  const { type, message, statusCode, flag } = result;

  // 3) Handle error
  if (type === "error") {
    next({ message, statusCode });
  }

  // 4) If success and flag is false, send data
  if (!flag && type === "success") {
    return res.status(statusCode).json({
      type,
      message,
      flag,
    });
  }

  // 5) If success and flag is true, regen session
  if (flag && type === "success") {
    req.session.regenerate((err) => {
      if (err) next({ message: "errorRegenSession", statusCode: 400 });

      return res.status(statusCode).json({
        type,
        message,
        flag,
      });
    });
  }
});

/**
 * @desc      Delete Client Session Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.session.cartId - Session Cart ID
 * @property  { String } req.session.orderId - Session Order ID
 * @return    { JSON } - A JSON object representing the type, and message
 */
const removeSession = catchAsync(async (req, res, next) => {
  // 1) Validate session data
  const schema = Joi.object({
    sessionCartId: Joi.string().hex(),
    sessionOrderId: Joi.string().hex(),
  });

  const { error, value } = schema.validate({
    sessionCartId: req.session.cartId,
    sessionOrderId: req.session.orderId,
  });

  // 2) Check session data
  let result;
  if (!error) {
    result = await sessionService.checkSession(
      value.sessionCartId,
      value.sessionOrderId
    );
  } else {
    next(error);
  }

  const { type, message, statusCode, flag } = result;

  // 3) Handle error
  if (type === "error") {
    next({ message, statusCode });
  }

  // 4) If success and flag is false, send data
  if (!flag && type === "success") {
    return res.status(statusCode).json({
      type,
      message,
      flag,
    });
  }

  // 5) If success and flag is true, regen session
  if (flag && type === "success") {
    req.session.destroy((err) => {
      if (err) next({ message: "errorRemoveSession", statusCode: 400 });

      return res.status(statusCode).json({
        type,
        message,
        flag,
      });
    });
  }
});

module.exports = {
  regenSession,
  removeSession,
};
