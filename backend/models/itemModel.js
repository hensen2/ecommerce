const mongoose = require("mongoose");

// Schema for each cart item
const itemSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.ObjectId,
      ref: "Product",
      required: true,
    },
    totalProductQuantity: {
      type: Number,
      default: 0,
      min: 0,
      max: 8,
    },
    totalProductPrice: {
      type: Number,
      default: 0.0,
      min: 0.0,
    },
  },
  {
    _id: false,
  }
);

itemSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = {
  itemSchema,
};
