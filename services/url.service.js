const generateShortCode = require("../utils/generateShortCode");

const {
  createShortURL,
  findByShortCode
} = require("../repositories/url.repository");
const redisClient = require("../config/redis");


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
const getOriginalURLService = async (code,requestId) => {

  // CHECK CACHE
  const cachedURL =
    await redisClient.get(code);

  // CACHE HIT
  if (cachedURL) {

    console.log(
  `[${requestId}] CACHE HIT`
);

    return {
      link_address: cachedURL
    };
  }

  console.log("CACHE MISS");

  // FETCH FROM DB
  const result =
    await findByShortCode(code);

  // IF URL EXISTS
  if (result) {

    // STORE IN CACHE
    await redisClient.set(
      code,
      result.link_address,
      {
        EX: 60
      }
    );
  }

  return result;
};


module.exports = {
  createURLService,
  getOriginalURLService
};