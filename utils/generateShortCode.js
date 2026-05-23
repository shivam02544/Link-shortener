const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  6
);

const generateShortCode = () => {
  return nanoid();
  // return "ABC123"
};

module.exports = generateShortCode;