const express = require("express");
const multer = require("multer");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { uploadImage } = require("../../helper/uploadimage");

router.post("/Uploadimage", upload.single("image"), async (req, res) => {
  try {
    let response = await uploadImage(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );
    if (response.data.status === 200) {
      res.status(200).json({ status: "success", data: response.data.data });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
