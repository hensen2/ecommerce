const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    cart: {
      type: mongoose.ObjectId,
      ref: "Cart",
      required: true,
      unique: true,
    },
    customer: {
      email: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      address: {
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        addressLine1: { type: String, default: "" },
        addressLine2: { type: String, default: "" },
        cityLocality: { type: String, default: "" },
        stateProvince: { type: String, default: "" },
        postalCode: { type: String, default: "" },
        countryCode: { type: String, default: "US" },
        addressResidentialIndicator: { type: String, default: "yes" },
        isValidated: { type: Boolean, default: false },
      },
    },
    package: {
      weightPounds: { type: Number, default: 0.0 },
      dimensionsInches: {
        length: { type: Number, default: 0.0 },
        width: { type: Number, default: 0.0 },
        height: { type: Number, default: 0.0 },
      },
      isDelivered: {
        type: Boolean,
        default: false,
      },
      deliveredOn: {
        type: Date,
        default: null,
      },
      trackingNumber: {
        type: String,
        default: "",
      },
    },
    transaction: {
      taxPrice: {
        type: Number,
        default: 0.0,
      },
      shippingPrice: {
        type: Number,
        default: 3.99,
      },
      totalPrice: {
        type: Number,
        default: 0.0,
      },
      taxRate: {
        type: Number,
        default: 0.0657,
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      paidOn: {
        type: Date,
        default: null,
      },
      paymentMethod: {
        type: String,
        default: "",
      },
      paymentStripeId: {
        type: String,
        default: "",
      },
    },

    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processed",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Expired",
      ],
    },
  },
  { timestamps: true }
);

orderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // Extract data for use in calculations
    const { taxRate, shippingPrice } = returnedObject.transaction;
    const { items, subtotalPrice } = returnedObject.cart;
    const { address, email, phone } = returnedObject.customer;

    // Calculate taxPrice and totalPrice
    const taxPrice = taxRate * (subtotalPrice + shippingPrice);
    const totalPrice = subtotalPrice + shippingPrice + taxPrice;

    // Update returned object data
    returnedObject.items = items;
    returnedObject.transaction = {
      subtotalPrice,
      shippingPrice,
      taxRate,
      taxPrice: Number(taxPrice.toFixed(2)),
      totalPrice: Number(totalPrice.toFixed(2)),
    };
    returnedObject.customer = {
      email,
      phone,
      ...address,
    };
    returnedObject.customer.postalCode =
      returnedObject.customer.postalCode?.slice(0, 5);

    // Remove unwanted data fields
    delete returnedObject.cart;
    delete returnedObject.customer.isValidated;
    delete returnedObject.customer.countryCode;
    delete returnedObject.customer.addressResidentialIndicator;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.updatedAt;
    delete returnedObject.createdAt;
  },
});

module.exports = mongoose.model("Order", orderSchema);
