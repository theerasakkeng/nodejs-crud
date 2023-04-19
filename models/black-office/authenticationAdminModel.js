const mongoose = require("mongoose");

const authenticationAdminSchema = new mongoose.Schema(
  {
    admin_id: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "admin",
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
    created_date: { type: Date, required: false },
  },
  {
    versionKey: false,
    collection: "authentication_admin",
  }
);
module.exports = mongoose.model(
  "authenticationAdmin",
  authenticationAdminSchema
);
