const express = require("express");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const router = express.Router();
const customerInfo = require("../models/customerModel");
const authentication = require("../models/authenticationModel");
const refreshTokenLog = require("../models/refreshTokenLogModel");

const {
  generateID,
  generateSalt,
  encryptPassword,
  generateTransactionRef,
} = require("../helper/utility");

const {
  jwtRefreshTokenValidate,
  jwtGenerateToken,
  jwtGenerateRefreshToken,
} = require("../helper/jwt");

// api/Authen/Register
router.post("/Register", async (req, res) => {
  let salt_key = generateSalt();
  let cus_id = generateID();
  const authen = new authentication({
    customer_id: cus_id,
    salt: salt_key,
    user_name: req.body.user_name,
    password: encryptPassword(req.body.password, salt_key),
  });
  const customer = new customerInfo({
    customer_id: cus_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    mobile_no: "",
    address: {
      address_info: "",
      sub_district: "",
      district: "",
      province: "",
      post_code: "",
    },
    created_date: moment().format(),
    update_date: moment().format(),
  });
  try {
    await authen.save();
    await customer.save();
    res.status(200).json({ status: "success", data: "register sucess" });
  } catch (error) {
    res.status(405).json({ message: error });
  }
});

// api/Authen/Getsalt
router.get("/Getsalt", async (req, res) => {
  try {
    const salt = await authentication.findOne({
      user_name: req.query.user_name,
    });
    let salt_res = {
      salt: salt.salt,
    };
    res.status(200).json({ status: "success", data: salt_res });
  } catch (er) {
    res.status(500).json({ message: err });
  }
});

// api/Authen/Login
router.post("/Login", async (req, res) => {
  try {
    const authen_data = await authentication.findOne({
      user_name: req.body.user_name,
    });
    if (authen_data) {
      if (authen_data.password === req.body.password) {
        const cus_id = authen_data.customer_id;
        const token = jwtGenerateToken(cus_id, {});
        const refresh_token = jwtGenerateRefreshToken(cus_id, {});
        const refreshtoken_log = await refreshTokenLog.findOne({
          customer_id: cus_id,
        });
        if (refreshtoken_log) {
          await refreshTokenLog.findOneAndUpdate(
            { customer_id: cus_id },
            {
              refresh_token: refresh_token,
            }
          );
        } else {
          const refreshtoken_log_insert = new refreshTokenLog({
            customer_id: cus_id,
            refresh_token: refresh_token,
          });
          await refreshtoken_log_insert.save();
        }
        res.status(200).json({
          status: "success",
          data: {
            token: token,
            refresh_token: refresh_token,
          },
        });
      } else {
        res.status(500).json({ status: "success", data: "login fail" });
      }
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//api/Authen/Refresh
router.post("/Refresh", jwtRefreshTokenValidate, async (req, res) => {
  try {
    console.log(req);
    const cus_id = await authentication.findOne({
      customer_id: req.user.sub,
    });
    const refresh_token = await refreshTokenLog.findOne({
      customer_id: req.user.sub,
    });
    if (cus_id && refresh_token) {
      if (
        cus_id.customer_id === req.user.sub &&
        refresh_token.refresh_token === req.user.refresh_token
      ) {
        const token = jwtGenerateToken(cus_id.customer_id, {});
        const refresh_token = jwtGenerateRefreshToken(cus_id.customer_id, {});
        res.status(200).json({
          status: "success",
          data: {
            token: token,
            refresh_token: refresh_token,
          },
        });
      }
      res.sendStatus(500);
    }
    res.sendStatus(500);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
