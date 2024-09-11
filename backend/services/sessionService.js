const catchAsync = require("../utils/catchAsync");
const { Order } = require("../models/index");

/**
 * @desc      Check Session Status
 * @param     { String } cartId - Session Cart ID
 * @param     { String } orderId - Session Order ID
 * @returns   { Object<type|message|statusCode|flag> }
 */
const checkSession = catchAsync(async (cartId, orderId) => {
  // 1) Find order with orderId and cartId
  // return cart and order status'
  const order = await Order.findOne({
    _id: orderId,
    cart: cartId,
  })
    .populate({
      path: "cart",
      select: ["status"],
    })
    .select(["cart", "status"])
    .exec();

  // 2) If no order found, or order AND cart active
  // return false flag and do nothing
  if (
    !order ||
    (order.status === "Not Processed" && order.cart.status === "active")
  ) {
    return {
      type: "success",
      message: "successCheckedSession",
      statusCode: 200,
      flag: false,
    };
  }

  // 3) Else, true flag and manipulate session
  return {
    type: "success",
    message: "successCheckedSession",
    statusCode: 200,
    flag: true,
  };
});

module.exports = {
  checkSession,
};
