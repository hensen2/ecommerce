const config = require("../config/config");
const stripe = require("stripe")(config.STRIPE_SECRET_KEY);
const { sendEmail } = require("../utils/sendEmail");
const moment = require("moment-timezone");
const catchAsync = require("../utils/catchAsync");
const { Order, Product } = require("../models/index");

/**
 * @desc    Fullfill Order
 * @param   { Object } body - Body object data
 * @returns { Object<type|message|statusCode> }
 */
const fulfillOrder = catchAsync(async ({ body, headers }) => {
  let event;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (config.STRIPE_WEBHOOK_KEY) {
    // Get the signature sent by Stripe
    const signature = headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        config.STRIPE_WEBHOOK_KEY
      );
    } catch (err) {
      return {
        type: "Error",
        message: `⚠️  Webhook signature verification failed. ${err.message}`,
        statusCode: 400,
      };
    }
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    // Update order with final details
    const { payment_method: paymentMethod, metadata } = paymentIntent;
    const update = {
      "transaction.isPaid": true,
      "transaction.paidOn": moment.unix(event.created).format(),
      "transaction.paymentMethod": paymentMethod,
      status: "Processed",
    };

    const order = await Order.findOneAndUpdate(
      { _id: metadata.orderId },
      update,
      {
        new: true,
      }
    )
      .populate({
        path: "cart",
        populate: {
          path: "items.product",
          select: ["stock", "totalSold", "mainImage", "name"],
        },
        select: [
          "items.totalProductQuantity",
          "items.totalProductPrice",
          "status",
        ],
      })
      .select(["cart", "customer.address", "transaction"])
      .exec();

    order.cart.status = "success";
    await order.cart.save();

    // Update product stock with product data returned by order
    for (const { product, totalProductQuantity } of order.cart.items) {
      await Product.findByIdAndUpdate(product.id, {
        $inc: { stock: -totalProductQuantity, totalSold: totalProductQuantity },
      });
    }

    // Send confirmation email/receipt
    sendEmail(
      metadata.email,
      "orderConfirm",
      order.id,
      order.customer.address,
      order.cart.items,
      order.transaction
    );

    // **********  create shippment manually ************ //
    // const {
    //   name,
    //   phone,
    //   addressLine1,
    //   addressLine2,
    //   cityLocality,
    //   stateProvince,
    //   postalCode,
    // } = order.customer;
    // const { weightPounds: value } = order.package;
    // const { length, width, height } = order.package.dimensionsInches;

    // const shipment = {
    //   validateAddress: "no_validation",
    //   shipTo: {
    //     name,
    //     phone,
    //     addressLine1,
    //     addressLine2,
    //     cityLocality,
    //     stateProvince,
    //     postalCode,
    //     countryCode: "US",
    //   },
    //   shipFrom: {
    //     name: "Matthew Hensen",
    //     phone: 7082125939,
    //     companyName: "Beanie Bubble Soap Co.",
    //     addressLine1: "453 Orchard Ln",
    //     cityLocality: "Beecher",
    //     stateProvince: "IL",
    //     postalCode: "60401",
    //     countryCode: "US",
    //     addressResidentialIndicator: "yes",
    //   },
    //   packages: [
    //     {
    //       weight: {
    //         value,
    //         unit: "pound",
    //       },
    //       dimensions: {
    //         unit: "inch",
    //         length,
    //         width,
    //         height,
    //       },
    //     },
    //   ],
    // };

    // Get shipping rates and compare
    // const ratesData = await getRates(shipment);
    // console.log("Rates response:", ratesData);
    // console.log("Rates:", ratesData.rateResponse.rates);

    // For testing we will grab USPS rateId
    // const rateId = ratesData.rateResponse.rates[0]["rateId"];

    // Create label with selected rateId
    // const labelData = await createLabel(rateId);
    // console.log("The label that was created:", labelData);
    // const labelId = labelData.labelId;
    // const shipmentId = data.shipmentId;
    // const eshipmentid = data.externalOrderId;
    // const shipmentCost = JSON.stringify(data.shipmentCost);
    // const tnumber = data.trackingNumber;
    // const carrierCode = data.carrierCode;
    // const serviceCode = data.serviceCode;
    // const label = data.labelDownload.pdf;
    // const package = JSON.stringify(data.packages);

    // Get tracking info with labelId
    // const trackingData = await trackUsingLabelId(labelId);
    // console.log("Tracking info:", trackingData);
    // const trackingNumber = data.trackingNumber;
    // const statusCode = data.statusCode;
  } else {
    // Unexpected event type
    //console.log(`Unhandled event type ${event.type}.`);
  }
  // Return a 200 response to acknowledge receipt of the event
  return {
    type: "Success",
    message: "successfulEventHandled",
    statusCode: 200,
  };
});

module.exports = {
  fulfillOrder,
};
