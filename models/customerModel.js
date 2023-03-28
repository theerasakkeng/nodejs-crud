const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const customerInfoSchema = new mongoose.Schema(
  {
    customer_no: {
      type: Number,
      unique: true,
    },
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
    email: {
      type: String,
      required: true,
    },
    mobile_no: { type: String, required: false },
    address: {
      address_info: { type: String, required: false },
      sub_district: { type: String, required: false },
      district: { type: String, required: false },
      province: { type: String, required: false },
      post_code: { type: String, required: false },
    },
    created_date: { type: Date, required: false },
    update_date: { type: Date, required: false },
    is_deleted: { type: Boolean, required: false, default: false },
  },
  {
    versionKey: false,
    collection: "customer_info",
  }
);
customerInfoSchema.plugin(AutoIncrement, { inc_field: "customer_no" });

module.exports = mongoose.model("customerInfo", customerInfoSchema);
