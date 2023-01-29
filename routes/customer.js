const express = require("express");
const router = express.Router();
const customerInfo = require("../models/customerModel");

const { generateID } = require("../helper/utility");

// api/Customer/Customerlist
router.get("/Customerlist", async (req, res) => {
  try {
    const customer = await customerInfo.find();
    res.status(200).json({ status: "success", data: customer });
  } catch (err) {
    res.status(405).json({ message: err });
  }
});

// api/Customer/Customerdetail
//test
router.get("/Customerdetail", async (req, res) => {
  if (req.query.customer_id) {
    try {
      const customer = await customerInfo.find({
        customer_id: req.query.customer_id,
      });
      res.status(200).json({ status: "success", data: customer });
    } catch (err) {
      res.status(405).json({ message: err });
    }
  } else {
    res.status(405).json({ message: "err" });
  }
});

// api/Customer/Customerinsert
router.post("/Customerinsert", async (req, res) => {
  const customer = new customerInfo({
    customer_id: generateID(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: {
      address_info: req.body.address.address_info,
      sub_district: req.body.address.sub_district,
    },
  });
  try {
    const saveCustomer = await customer.save();
    res.status(200).json({ status: "success", data: saveCustomer });
  } catch (error) {
    res.status(405).json({ message: error });
  }
});

module.exports = router;
