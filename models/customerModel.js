const mongoose = require("mongoose");

const customerInfoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    collection: "customerInfo",
    id: false
  }
);

module.exports = mongoose.model("customerInfo", customerInfoSchema);
