const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  6
);

const generateShortCode = () => {
  return nanoid();
};

module.exports = generateShortCode;