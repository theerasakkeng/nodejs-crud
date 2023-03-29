const mongoose = require("mongoose");

const refreshTokenLogSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      unique: true,
      required: true,
    },
    refresh_token: {
      type: String,
      required: true,
    },
    update_date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
    collection: "refresh_token_log",
  }
);
module.exports = mongoose.model("refreshTokenLog", refreshTokenLogSchema);
