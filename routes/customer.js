const express = require("express");
const router = express.Router();
const customerInfo = require("../models/customerModel");

const { generateID } = require("../helper/utility");

//GetCustomerInfo
router.get("/CustomerInfo", async (req, res) => {
  try {
    const customer = await customerInfo.find();
    res.status(200).json({ status: "success", data: customer });
  } catch (err) {
    res.status(405).json({ message: err });
  }
});

//InsertCustomerInfo
router.post("/CustomerInsert", async (req, res) => {
  const customer = new customerInfo({
    id: generateID(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });
  try {
    const saveCustomer = await customer.save();
    res.status(200).json({ status: "success", data: saveCustomer });
  } catch (error) {
    res.status(405).json({ message: error });
  }
});

module.exports = router;
