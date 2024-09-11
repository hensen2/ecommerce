// Utils
const catchAsync = require("../utils/catchAsync");

// Models
const { Product } = require("../models/index");

/**
 * @desc    Query products
 * @returns { Object<type|message|statusCode|products> }
 */
const queryProducts = catchAsync(async () => {
  const products = await Product.find({})
    .populate("ingredients")
    .orFail()
    .exec();

  if (!products) {
    return {
      type: "error",
      message: "noProductsFound",
      statusCode: 404,
    };
  }
  return {
    type: "success",
    message: "successfulProductsFound",
    statusCode: 200,
    products,
  };
});

/**
 * @desc    Query Product Using It's ID
 * @param   { String } productId - Product ID
 * @returns { Object<type|message|statusCode|product> }
 */
const queryByProductId = catchAsync(async (productId) => {
  const product = await Product.findById(productId);

  // 1) Check if product doesn't exist
  if (!product) {
    return {
      type: "Error",
      message: "noProductFound",
      statusCode: 404,
    };
  }

  // 2) If everything is OK, send product
  return {
    type: "Success",
    message: "successfulProductFound",
    statusCode: 200,
    product,
  };
});

module.exports = { queryProducts, queryByProductId };
