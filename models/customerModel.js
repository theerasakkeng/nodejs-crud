const mongoose = require("mongoose");

const customerInfoSchema = new mongoose.Schema(
  {
    customer_id: {
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
    address: {
      address_info: { type: String, required: true },
      sub_district: { type: String, required: true },
    },
  },
  {
    versionKey: false,
    collection: "customerInfo",
  }
);

module.exports = mongoose.model("customerInfo", customerInfoSchema);
