const mongoose = require("mongoose");
const { itemSchema } = require("./itemModel");

// Schema for cart
const cartSchema = mongoose.Schema(
  {
    items: [itemSchema],
    subtotalPrice: {
      type: Number,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "expired", "success"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.updatedAt;
    delete returnedObject.createdAt;
    delete returnedObject.status;
  },
});

module.exports = mongoose.model("Cart", cartSchema);
