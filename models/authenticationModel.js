const mongoose = require("mongoose");

const authenticationSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      unique: true,
    },
    salt: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    collection: "authentication",
  }
);
module.exports = mongoose.model("authentication", authenticationSchema);
