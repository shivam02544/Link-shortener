const generateShortCode = require("../utils/generateShortCode");

const {
  createShortURL,
  findByShortCode
} = require("../repositories/url.repository");


// CREATE SHORT URL
const createURLService = async (url) => {

  while (true) {

    // GENERATE RANDOM CODE
    const shortCode = generateShortCode();

    try {

      // TRY INSERTING DIRECTLY
      await createShortURL(shortCode, url);

      // SUCCESS
      return {
        shortCode,
        shortURL: `http://localhost:3001/${shortCode}`
      };

    } catch (error) {

      // POSTGRES UNIQUE CONSTRAINT ERROR
      if (error.code === "23505") {

        console.log("Collision happened. Retrying...");

        // RETRY AGAIN
        continue;
      }

      // OTHER ERRORS
      throw error;
    }
  }
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