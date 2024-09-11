const {
  createPayment,
  retrievePayment,
  updatePayment,
} = require("../utils/stripe");
const { validateAddresses } = require("../utils/shipengine");
const taxRates = require("../data/taxRates");
const catchAsync = require("../utils/catchAsync");
const { Order } = require("../models/index");

/**
 * @desc       Setup Checkout Session
 * @param      { Object } session - Client Session Object
 * @property   { String } cartId - Session Cart ID
 * @property   { String } orderId - Session Order ID
 * @returns { Object<type|message|statusCode|orderId> }
 */
const setupCheckout = catchAsync(async (session) => {
  let statusCode = 200;

  // 1) Find order using id or create new
  if (session.orderId) {
    await Order.findOne({
      _id: session.orderId,
      cart: session.cartId,
      status: "Not Processed",
    })
      .select(["id"])
      .orFail()
      .exec();
  } else {
    const { id } = await Order.create({
      cart: session.cartId,
    });

    // Update session data and status code
    session.orderId = id;
    statusCode = 201;
  }

  // 2) Return order data
  return {
    type: "success",
    message: "successSetupCheckoutSession",
    statusCode,
    orderId: session.orderId,
  };
});

/**
 * @desc     Get Order
 * @param    { String } orderId - Order ID
 * @returns  { Object<type|message|statusCode|order|clientSecret|paymentMethod|isSuccess|isComplete> }
 */
const getOrder = catchAsync(async (orderId) => {
  // 1) Find order by id
  const order = await Order.findById(orderId)
    .populate({
      path: "cart",
      populate: {
        path: "items.product",
        select: ["name", "price", "mainImage", "categories"],
      },
      select: ["items", "subtotalPrice"],
    })
    .select([
      "cart",
      "customer",
      "transaction.paymentStripeId",
      "transaction.taxRate",
      "transaction.shippingPrice",
    ])
    .orFail()
    .exec();

  // 2) Initialize data and flags
  let isSuccess = false;
  let isComplete = false;
  let clientSecret = "";
  let paymentMethod = {
    brand: "",
    last4: "",
    exp_month: "",
    exp_year: "",
  };

  // 3) If validated and paymentStripeId exists, then retrieve clientSecret
  if (order.customer.address.isValidated && order.transaction.paymentStripeId) {
    const { client_secret, payment_method, status, amount } =
      await retrievePayment(order.transaction.paymentStripeId);

    if (status === "succeeded") {
      const { brand, last4, exp_month, exp_year } = payment_method.card;
      paymentMethod = { brand, last4, exp_month, exp_year };
      isComplete = true;
      isSuccess = true;
    } else {
      const { taxRate, shippingPrice } = order.transaction;
      const { subtotalPrice } = order.cart;

      const taxPrice = Number(
        (taxRate * (subtotalPrice + shippingPrice)).toFixed(2)
      );
      const totalPrice = Number(
        (subtotalPrice + shippingPrice + taxPrice).toFixed(2)
      );

      const totalAmount = Math.round(totalPrice * 100);
      if (totalAmount === amount) {
        isComplete = true;
        clientSecret = client_secret;
      }
    }
  }

  // 4) Return data
  return {
    type: "success",
    message: "successGetOrder",
    statusCode: 200,
    order,
    clientSecret,
    paymentMethod,
    isSuccess,
    isComplete,
  };
});

/**
 * @desc    Update Order Data
 * @param     { String } orderId - Order ID
 * @param     { Number } shippingPrice - Customer Shipping Price
 * @param     { String } email - Customer Email
 * @param     { String } phone - Customer Phone
 * @param     { Object } address - Customer Address Data
 * @property  { String } firstName - First Name
 * @property  { String } lastName - Last Name
 * @property  { String } addressLine1 - Address 1
 * @property  { String } addressLine2 - Address 2
 * @property  { String } cityLocality - City
 * @property  { String } stateProvince - State
 * @property  { String } postalCode - Zip Code
 * @returns { Object<type|message|statusCode|order|clientSecret> }
 */
const confirmOrder = catchAsync(
  async (orderId, shippingPrice, email, phone, address) => {
    // 1) Find active order with orderId and update
    // return cart items, transaction details, and customer
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
        status: "Not Processed",
      },
      {
        "transaction.shippingPrice": shippingPrice,
        "customer.email": email,
        "customer.phone": phone,
      },
      {
        new: true,
      }
    )
      .populate({
        path: "cart",
        populate: {
          path: "items.product",
          select: ["name", "price", "mainImage", "categories"],
        },
        select: ["items", "subtotalPrice"],
      })
      .select([
        "cart",
        "customer",
        "transaction.paymentStripeId",
        "transaction.taxRate",
        "transaction.shippingPrice",
      ])
      .orFail()
      .exec();

    // 2) If previously validated, check for shallow equality
    if (order.customer.address.isValidated) {
      const {
        addressLine1,
        addressLine2,
        cityLocality,
        stateProvince,
        postalCode,
      } = order.customer.address;

      const validatedAddress = {
        addressLine1,
        addressLine2,
        cityLocality,
        stateProvince,
        postalCode: postalCode.slice(0, 5),
      };

      // If any inequality exists, then set isValidated to false
      for (let key of Object.keys(validatedAddress)) {
        if (validatedAddress[key] !== address[key]) {
          order.customer.address.isValidated = false;
        }
      }
    }

    // 3) If invalid, validate customer address with ShipEngine API call and update order
    if (!order.customer.address.isValidated) {
      const { addressResidentialIndicator, postalCode } =
        await validateAddresses(address);

      if (!addressResidentialIndicator || !postalCode) {
        return {
          type: "error",
          message: "errorAddressValidation",
          statusCode: 400,
        };
      }

      // Update order data with validated address
      order.transaction.taxRate = taxRates[address.stateProvince];
      order.customer.address = {
        ...address,
        countryCode: "US",
        postalCode,
        addressResidentialIndicator,
        isValidated: true,
      };
    }

    // 4) Calculate and update order data with shipping price, cart subtotal, and taxRate
    const taxPrice =
      order.transaction.taxRate * (order.cart.subtotalPrice + shippingPrice);
    const totalPrice = order.cart.subtotalPrice + shippingPrice + taxPrice;

    order.transaction.taxPrice = Number(taxPrice.toFixed(2));
    order.transaction.totalPrice = Number(totalPrice.toFixed(2));

    // 5) Calculate stripe amount and initialize data
    const totalAmount = Math.round(order.transaction.totalPrice * 100);
    let clientSecret = "";
    let isComplete = false;

    // 6) If paymentStripeId exists, then retrieve paymentIntent and update data
    // else create Stripe payment intent and update data
    if (order.transaction.paymentStripeId) {
      const { client_secret, amount } = await retrievePayment(
        order.transaction.paymentStripeId
      );

      if (totalAmount === amount) {
        isComplete = true;
        clientSecret = client_secret;
      } else {
        const { client_secret } = await updatePayment(
          order.transaction.paymentStripeId,
          totalAmount,
          order.customer.email
        );

        isComplete = true;
        clientSecret = client_secret;
      }
    } else {
      const { id, client_secret } = await createPayment(
        totalAmount,
        orderId,
        email
      );

      isComplete = true;
      clientSecret = client_secret;

      // Update order data with Stripe ID
      order.transaction.paymentStripeId = id;
    }

    // 7) Save the updated order data
    await order.save();

    return {
      type: "success",
      message: "successfulConfirmOrder",
      statusCode: 201,
      order,
      clientSecret,
      isComplete,
    };
  }
);

module.exports = {
  getOrder,
  confirmOrder,
  setupCheckout,
};
