const mongoose = require("mongoose");

const refreshTokenAdminLogSchema = new mongoose.Schema(
  {
    admin_id: {
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
    collection: "refresh_token_admin_log",
  }
);
module.exports = mongoose.model("refreshTokenAdminLog", refreshTokenAdminLogSchema);