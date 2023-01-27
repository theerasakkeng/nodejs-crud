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

module.exports = { generateID };
