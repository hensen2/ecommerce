const Joi = require("joi");
const catchAsync = require("../utils/catchAsync");
const { orderService } = require("../services/index");
const config = require("../config/config");

/**
 * @desc      Setup Checkout Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.session.cartId - Session Cart ID
 * @property  { String } req.session.orderId - Session Order ID
 * @return    { JSON } - A JSON object representing the type, message, and orderId
 */
const setupCheckout = catchAsync(async (req, res, next) => {
  // 1) If no cart session, handle error
  if (!req.session.cartId) {
    const err = new Error("cartIdRequired");
    err.name = "InputValidationError";
    next(err);
    return;
  }

  // 2) Setup checkout session
  const { type, message, statusCode, orderId } =
    await orderService.setupCheckout(req.session);

  // 3) If success, send data
  return res.status(statusCode).json({
    type,
    message,
    orderId,
  });
});

/**
 * @desc      Get Stripe Key Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @return    { JSON } - A JSON object representing the type, message, and stripeKey
 */
const getStripeKey = catchAsync(async (req, res) => {
  // Send stripe key
  return res.status(200).json({
    type: "success",
    message: "successGetStripeKey",
    stripeKey: config.STRIPE_PUBLISHABLE_KEY,
  });
});

/**
 * @desc      Get Order Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.params.orderId - Order ID
 * @return    { JSON } - A JSON object representing the type, message, and order data
 */
const getOrder = catchAsync(async (req, res, next) => {
  // 1) Validate order data
  const schema = Joi.object({
    orderId: Joi.string().hex().required(),
  });

  const { error, value } = schema.validate({
    orderId: req.params.orderId,
  });

  // 2) Handle validation error
  if (error) {
    error.name = "InputValidationError";
    next(error);
    return;
  }

  // 3) Get order data
  const {
    type,
    message,
    statusCode,
    order,
    clientSecret,
    paymentMethod,
    isSuccess,
    isComplete,
  } = await orderService.getOrder(value.orderId);

  // 3) If success, send data
  return res.status(statusCode).json({
    type,
    message,
    order,
    clientSecret,
    paymentMethod,
    isSuccess,
    isComplete,
  });
});

/**
 * @desc      Update Order Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.session.orderId - Session Order ID
 * @property  { String } req.params.orderId - Order ID
 * @property  { Object } req.body - Checkout Data
 * @returns   { JSON } - A JSON object representing the type, message, order, and clientSecret
 */
const confirmOrder = catchAsync(async (req, res, next) => {
  // 1) Validate order data
  const schema = Joi.object({
    orderId: Joi.string().hex().required(),
    sessionOrderId: Joi.ref("orderId"),
    shippingPrice: Joi.number()
      .min(3.99)
      .max(8.99)
      .positive()
      .precision(2)
      .required(),
    email: Joi.string().trim().lowercase().email().required(),
    phone: Joi.string().trim().allow("").optional(),
    address: Joi.object({
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      addressLine1: Joi.string().trim().required(),
      addressLine2: Joi.string().trim().allow("").optional(),
      cityLocality: Joi.string().trim().required(),
      stateProvince: Joi.string().trim().required(),
      postalCode: Joi.string().trim().required(),
    }).required(),
  });

  const { customer } = req.body;
  const { error, value } = schema.validate({
    orderId: req.params.orderId,
    sessionOrderId: req.session.orderId,
    shippingPrice: req.body.shippingPrice,
    email: customer.email,
    phone: customer.phone,
    address: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      addressLine1: customer.addressLine1,
      addressLine2: customer.addressLine2,
      cityLocality: customer.cityLocality,
      stateProvince: customer.stateProvince,
      postalCode: customer.postalCode,
    },
  });

  // 2) Handle validation error
  if (error) {
    error.name = "InputValidationError";
    next(error);
    return;
  }

  // 3) Confirm order
  const { orderId, shippingPrice, email, phone, address } = value;
  const { type, message, statusCode, order, clientSecret, isComplete } =
    await orderService.confirmOrder(
      orderId,
      shippingPrice,
      email,
      phone,
      address
    );

  // 3) If success, send data
  if (type === "success") {
    return res.status(statusCode).json({
      type,
      message,
      order,
      clientSecret,
      isComplete,
    });
  }

  // 4) Handle error
  next({ message, statusCode });
});

module.exports = {
  getStripeKey,
  getOrder,
  confirmOrder,
  setupCheckout,
};
