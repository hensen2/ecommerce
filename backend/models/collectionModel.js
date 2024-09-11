const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mainImage: {
      type: String,
      required: [true, "A collection must have a main image"],
    },
    images: {
      type: [String],
      required: [true, "A collection must have sub images"],
    },
    price: {
      type: Number,
      required: [true, "A collection must have sub images"],
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

collectionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Collection", collectionSchema);
