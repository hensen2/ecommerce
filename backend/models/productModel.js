const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A product must have a description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    stock: {
      type: Number,
      default: 0,
    },
    stockRemaining: {
      type: Number,
      default: 50,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
    mainImage: {
      type: String,
      required: [true, "A product must have a main image"],
    },
    images: {
      type: [String],
      required: [true, "A product must have sub images"],
    },
    categories: {
      type: {
        type: String,
        enum: [
          "Body Bar",
          "Buffing Bar",
          "Sugar Scrub",
          "Soap Fluff",
          "Accessories",
        ],
        required: [true, "A product must have a type"],
      },
      scent: {
        type: [String],
        enum: ["Citrus", "Fruity", "Fresh", "Floral", "Sweet", "Unscented"],
        required: [true, "A product must have a scent"],
      },
      size: {
        type: String,
      },
    },
    ingredients: [
      {
        type: mongoose.ObjectId,
        ref: "Ingredient",
        required: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isCollection: {
      type: Boolean,
      default: false,
    },
    details: {
      type: String,
      required: [true, "A product must have a details section"],
      trim: true,
    },
    // collection: {
    //   type: mongoose.ObjectId,
    //   ref: "Collection",
    // },
    // reviews: [
    //   {
    //     type: mongoose.ObjectId,
    //     ref: "Review",
    //   },
    // ],
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.updatedAt;
    delete returnedObject.createdAt;
    delete returnedObject.stock;
    delete returnedObject.totalSold;
  },
});

module.exports = mongoose.model("Product", productSchema);
