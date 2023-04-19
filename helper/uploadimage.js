const axios = require("axios");
const FormData = require("form-data");

require("dotenv").config();
const { UPLOAD_KEY } = process.env;

const uploadImage = async (image) => {
  try {
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    let response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${UPLOAD_KEY}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return "5555";
};

module.exports = {
  uploadImage,
};
