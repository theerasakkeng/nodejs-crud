const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

const { uploadImage } = require("../../helper/uploadimage");

router.post("/Uploadimage", upload.single("image"), async (req, res) => {
  try {
    let res = await uploadImage(req.file);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
