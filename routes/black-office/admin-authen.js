const express = require("express");
const moment = require("moment");
const router = express.Router();
const authenticationAdmin = require("../../models/black-office/authenticationAdminModel");
const refreshTokenAdminLog = require("../../models/black-office/refreshTokenAdminLogModel");

const {
  generateID,
  generateSalt,
  encryptPassword,
} = require("../../helper/utility");

const {
  jwtRefreshTokenValidate,
  jwtGenerateToken,
  jwtGenerateRefreshToken,
} = require("../../helper/jwt");

// api/black-office/Authen/Register
router.post("/Register", async (req, res) => {
  let salt_key = generateSalt();
  let cus_id = generateID();
  const authen = new authenticationAdmin({
    admin_id: cus_id,
    role: req.body.role,
    salt: salt_key,
    user_name: req.body.user_name,
    password: encryptPassword(req.body.password, salt_key),
    created_date: moment().format(),
  });
  try {
    await authen.save();
    res.status(200).json({ status: "success", data: "register sucess" });
  } catch (error) {
    res.status(405).json({ message: error });
  }
});

// api/black-office/Authen/Getsalt
router.get("/Getsalt", async (req, res) => {
  try {
    const salt = await authenticationAdmin.findOne({
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

// api/black-office/Authen/Login
router.post("/Login", async (req, res) => {
  try {
    const authen_data = await authenticationAdmin.findOne({
      user_name: req.body.user_name,
    });
    if (authen_data) {
      if (authen_data.password === req.body.password) {
        const cus_id = authen_data.admin_id;
        const token = jwtGenerateToken(cus_id, {role:authen_data.role},"1d");
        const refresh_token = jwtGenerateRefreshToken(cus_id, {});
        const refreshtoken_log = await refreshTokenAdminLog.findOne({
          admin_id: cus_id,
        });
        if (refreshtoken_log) {
          await refreshTokenAdminLog.findOneAndUpdate(
            { admin_id: cus_id },
            {
              refresh_token: refresh_token,
              update_date: new Date(),
            }
          );
        } else {
          const refreshtoken_log_insert = new refreshTokenAdminLog({
            admin_id: cus_id,
            refresh_token: refresh_token,
            update_date: new Date(),
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

//api/black-office/Authen/Refresh
router.post("/Refresh", jwtRefreshTokenValidate, async (req, res) => {
  try {
    const cus_id = await authenticationAdmin.findOne({
      admin_id: req.user.sub,
    });
    const refresh_token = await refreshTokenAdminLog.findOne({
        admin_id: req.user.sub,
    });
    if (cus_id && refresh_token) {
      if (
        cus_id.admin_id === req.user.sub &&
        refresh_token.refresh_token === req.user.refresh_token
      ) {
        const token = jwtGenerateToken(cus_id.admin_id, {},"1d");
        const refresh_token = jwtGenerateRefreshToken(cus_id.admin_id, {});
        await refreshTokenAdminLog.findOneAndUpdate(
          { admin_id: cus_id.admin_id },
          {
            refresh_token: refresh_token,
          }
        );
        res.status(200).json({
          status: "success",
          data: {
            token: token,
            refresh_token: refresh_token,
          },
        });
      } else {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
