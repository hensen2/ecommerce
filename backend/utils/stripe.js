const config = require("../config/config");
const stripe = require("stripe")(config.STRIPE_SECRET_KEY);

async function createPayment(amount, orderId, email) {
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId,
        email,
      },
    });

    const { id, client_secret } = paymentIntent;

    return { id, client_secret };
  } catch (err) {
    return {
      type: "Error",
      message: "noPaymentCreated",
      statusCode: 400,
    };
  }
}

async function retrievePayment(paymentId) {
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentId, {
      expand: ["payment_method"],
    });

    return paymentIntent;
  } catch (error) {
    return {
      type: "Error",
      message: "noPaymentRetrieved",
      statusCode: 400,
    };
  }
}

async function updatePayment(paymentId, amount, email) {
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.update(paymentId, {
      amount,
      metadata: { email },
    });

    return paymentIntent;
  } catch (error) {
    return {
      type: "Error",
      message: "noPaymentUpdated",
      statusCode: 400,
    };
  }
}

module.exports = {
  createPayment,
  retrievePayment,
  updatePayment,
};
