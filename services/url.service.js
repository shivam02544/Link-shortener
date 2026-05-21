const generateShortCode = require("../utils/generateShortCode");

const {
  createShortURL,
  findByShortCode
} = require("../repositories/url.repository");


// CREATE SHORT URL
const createURLService = async (url) => {

  // GENERATE SHORT CODE
  const shortCode = generateShortCode();

  // SAVE TO DATABASE
  await createShortURL(shortCode, url);

  return {
    shortCode,
    shortURL: `http://localhost:3001/${shortCode}`
  };
};


// GET ORIGINAL URL
const getOriginalURLService = async (code) => {

  const result = await findByShortCode(code);

  return result;
};


module.exports = {
  createURLService,
  getOriginalURLService
};