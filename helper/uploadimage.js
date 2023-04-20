const axios = require("axios");
const FormData = require("form-data");

require("dotenv").config();
const { UPLOAD_KEY } = process.env;

const uploadImage = async (image, name, type) => {
  let response = null;
  try {
    const formData = new FormData();
    formData.append("image", image, {
      filename: name,
      contentType: type,
    });
    let res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${UPLOAD_KEY}`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    response = res;
  } catch (error) {
    console.log(error);
  }
  return response;
};

module.exports = {
  uploadImage,
};
