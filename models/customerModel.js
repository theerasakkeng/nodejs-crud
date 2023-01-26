const mongoose = require("mongoose");

const customerInfoSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
  },
  { versionKey: false, collection: "customerInfo" }
);

module.exports = mongoose.model("customerInfo", customerInfoSchema);
