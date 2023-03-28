var CryptoJS = require("crypto-js");

const generateID = () => {
  const charactors =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key1 = "";
  let key2 = "";
  for (let i = 0; i < 10; i++) {
    key1 += charactors.charAt(Math.floor(Math.random() * charactors.length));
    key2 += charactors.charAt(Math.floor(Math.random() * charactors.length));
  }
  let userID = `ID_${key1}_${key2}`;

  return userID;
};

const generateSalt = () => {
  const charactors =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-/_*";
  let salt = "";
  for (let i = 0; i < 32; i++) {
    salt += charactors.charAt(Math.floor(Math.random() * charactors.length));
  }

  return salt;
};

const encryptPassword = (password, salt) => {
  let hash = CryptoJS.SHA256(password + salt);
  let hash_string = hash.toString(CryptoJS.enc.Base64);
  return hash_string;
};

const generateTransactionRef = () => {
  const charactors =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let tran1 = "";
  let tran2 = "";
  for (let i = 0; i < 16; i++) {
    tran1 += charactors.charAt(Math.floor(Math.random() * charactors.length));
    tran2 += charactors.charAt(Math.floor(Math.random() * charactors.length));
  }
  let trabnsaction_ref = `${tran1}-${tran2}`;

  return trabnsaction_ref;
};

module.exports = {
  generateID,
  generateSalt,
  encryptPassword,
  generateTransactionRef,
};
