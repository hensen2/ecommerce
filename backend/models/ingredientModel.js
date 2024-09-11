const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An ingredient must have a name"],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  isKey: {
    type: Boolean,
    default: false,
  },
});

ingredientSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
