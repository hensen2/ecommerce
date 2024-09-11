// Utils
const catchAsync = require("../utils/catchAsync");

// Services
const { productService } = require("../services/index");

/**
 * @desc      Get All Products Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @param     { Function } next - Next handler function
 * @returns   { JSON } - A JSON object representing the type, message and the products
 */
const getAllProducts = catchAsync(async (req, res, next) => {
  // 1) Get all products
  const { type, message, statusCode, products } =
    await productService.queryProducts();

  // 2) If everything is OK, send data
  if (type === "success") {
    return res.status(statusCode).json({
      type,
      message,
      products,
    });
  }

  // 3) Handle error
  next({ message, statusCode });
});

/**
 * @desc      Get Product Using It's ID Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.productId - Product ID
 * @returns   { JSON } - A JSON object representing the type, message, and the product
 */
const getProduct = catchAsync(async (req, res, next) => {
  // 1) Get product using it's ID
  const { type, message, statusCode, product } =
    await productService.queryProductById(req.params.productId);

  // 2) Check if there is an error
  if (type === "Error") {
    next({ message, statusCode });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
    product,
  });
});

module.exports = { getAllProducts, getProduct };
