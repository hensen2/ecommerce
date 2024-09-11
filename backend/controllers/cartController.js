const Joi = require("joi");
const catchAsync = require("../utils/catchAsync");
const { cartService } = require("../services/index");

// CONSTANTS
const emptyCart = {
  items: [],
  subtotalPrice: 0,
  totalQuantity: 0,
};

/**
 * @desc      Get Cart Session Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.session.cartId - Session Cart ID
 * @returns   { JSON } - A JSON object representing the type, message, and cart
 */
const getCart = catchAsync(async (req, res, next) => {
  // 1) If no cart session, return empty cart
  if (!req.session.cartId) {
    return res.status(200).json({
      type: "success",
      message: "successCartFound",
      cart: emptyCart,
    });
  }

  // 2) Find cart session
  const { type, message, statusCode, cart } = await cartService.getCartSession(
    req.session.cartId
  );

  // 3) If active cart found, return cart data
  if (cart?.status === "active") {
    return res.status(statusCode).json({
      type,
      message,
      cart,
    });
  }

  // 4) Clear stale session and return empty cart
  req.session.regenerate(function (err) {
    if (err) next(err);

    req.session.save(function (err) {
      if (err) return next(err);

      return res.status(statusCode).json({
        type,
        message,
        cart: emptyCart,
      });
    });
  });
});

/**
 * @desc      Add To Cart Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.session.cartId - Session Cart ID
 * @property  { String } req.params.productId - Product ID
 * @property  { Number } req.body.quantitiy - Product quantity to add
 * @returns   { JSON } - A JSON object representing the type, and message
 */
const addToCart = catchAsync(async (req, res, next) => {
  // 1) Validate cart data
  const schema = Joi.object({
    productId: Joi.string().trim().hex().required(),
    quantity: Joi.number().integer().max(8).min(1).required(),
  });

  const { error, value } = schema.validate({
    productId: req.params.productId,
    quantity: req.body.quantity,
  });

  // 2) Handle validation error
  if (error) {
    error.name = "InputValidationError";
    next(error);
    return;
  }

  // 3) Add product to cart or create new cart
  let result;

  if (req.session.cartId) {
    result = await cartService.addToCart(
      req.session.cartId,
      value.productId,
      value.quantity
    );
  } else {
    result = await cartService.createCart(
      req.session,
      value.productId,
      value.quantity
    );
  }

  const { type, message, statusCode } = result;

  // 4) If success, send data
  if (type === "success") {
    return res.status(statusCode).json({
      type,
      message,
    });
  }

  // 5) Handle error
  next({ message, statusCode });
});

/**
 * @desc      Update Cart Item Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.session.cartId - Session Cart ID
 * @property  { String } req.params.productId - Product ID
 * @property  { Number } req.body.quantitiy - Product Quantity to Update
 * @returns   { JSON } - A JSON object representing the type, and message
 */
const updateItem = catchAsync(async (req, res, next) => {
  // 1) Validate cart data
  const schema = Joi.object({
    productId: Joi.string().trim().hex().required(),
    quantity: Joi.number().integer().max(8).min(1).required(),
  });

  const { error, value } = schema.validate({
    productId: req.params.productId,
    quantity: req.body.quantity,
  });

  // 2) Handle validation error
  if (error) {
    error.name = "InputValidationError";
    next(error);
    return;
  }

  // 3) Update cart data
  const { type, message, statusCode } = await cartService.updateItem(
    req.session.cartId,
    value.productId,
    value.quantity
  );

  // 4) If success, send data
  if (type === "success") {
    return res.status(statusCode).json({
      type,
      message,
    });
  }

  // 5) Handle error
  next({ message, statusCode });
});

/**
 * @desc      Delete Product From Cart Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @property  { String } req.session.cartId - Session Cart ID
 * @property  { String } req.params.productId - Product ID
 * @returns   { JSON } - A JSON object representing the type, and message
 */
const deleteItem = catchAsync(async (req, res, next) => {
  // 1) Validate cart data
  const schema = Joi.object({
    productId: Joi.string().trim().hex().required(),
  });

  const { error, value } = schema.validate({
    productId: req.params.productId,
  });

  // 2) Handle validation error
  if (error) {
    error.name = "InputValidationError";
    next(error);
    return;
  }

  // 3) Remove product from cart
  const { type, message, statusCode } = await cartService.deleteItem(
    req.session.cartId,
    value.productId
  );

  // 4) If success, send data
  if (type === "success") {
    return res.status(statusCode).json({
      type,
      message,
    });
  }

  // 5) Handle error
  next({ message, statusCode });
});

module.exports = {
  getCart,
  addToCart,
  updateItem,
  deleteItem,
};
