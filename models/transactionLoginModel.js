const mongoose = require("mongoose");
const moment = require("moment");

const transactionLoginSchema = new mongoose.Schema(
  {
    transaction_ref: {
      type: String,
    },
    user_name: {
      type: String,
    },
    create_date: {
      type: Date,
    },
  },
  {
    versionKey: false,
    collection: `transaction_login_${moment().format('YYYY-MM-DD')}`,
  }
);
module.exports = mongoose.model("transactionLogin", transactionLoginSchema);
