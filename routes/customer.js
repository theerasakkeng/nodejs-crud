const express = require("express");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const router = express.Router();
const customerInfo = require("../models/customerModel");

const { generateID } = require("../helper/utility");
const { jwtTokenValidate } = require("../helper/jwt");

// api/Customer/Customerlist
router.get("/Customerlist", jwtTokenValidate, async (req, res) => {
  try {
    const customer = await customerInfo.find();
    let customer_res = [];
    customer.forEach((o) => {
      let data = {
        first_name: o.first_name,
        last_name: o.last_name,
        email: o.email,
        mobile_no: o.mobile_no,
        created_date: moment(o.created_date).format(),
        update_date: moment(o.update_date).format(),
      };
      customer_res.push(data);
    });
    res.status(200).json({ status: "success", data: customer_res });
  } catch (err) {
    res.status(405).json({ message: err });
  }
});

// api/Customer/Customerdetail
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

module.exports = router;
