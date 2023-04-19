const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

require("dotenv").config();
const { DB_CONNECTION_URL, PORT } = process.env;

app.get("/", (req, res) => {
  res.send("welcome api");
});

//Routes customer
const customerRoute = require("./routes/customer");
app.use("/api/Customer", customerRoute);

//Routes authen
const authenRoute = require("./routes/authen");
app.use("/api/Authen", authenRoute);

//Routes black office authen
const authenBlackOfficeRoute = require("./routes/black-office/admin_authen")
app.use("/api/black-office/authen", authenBlackOfficeRoute);

mongoose.set("strictQuery", true);
mongoose.connect(DB_CONNECTION_URL, { useNewUrlParser: true }, async () => {
  try {
    console.log("connect DB");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, async (req, res) => {
  try {
    console.log(PORT);
  } catch (error) {
    console.log(error);
  }
});
