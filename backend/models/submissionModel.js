const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    subject: {
      type: String,
      required: true,
      enum: ["Question", "Custom Order", "Product Issue"],
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

submissionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Submission", submissionSchema);
