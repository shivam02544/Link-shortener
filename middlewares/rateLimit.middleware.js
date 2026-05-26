const redisClient =
  require("../config/redis");


const rateLimitMiddleware =
  async (req, res, next) => {

    try {

      // USER IP
      const ip = req.ip;
      console.log(ip);
      

      // REDIS KEY
      const key = `rate-limit:${ip}`;

      // GET CURRENT REQUEST COUNT
      const requests =
        await redisClient.get(key);


      // FIRST REQUEST
      if (!requests) {

        // STORE COUNT
        await redisClient.set(
          key,
          1,
          {
            EX: 60 // 60 seconds
          }
        );

        return next();
      }


      // TOO MANY REQUESTS
      if (Number(requests) >= 5) {

        return res.status(429).json({
          error:
            "Too many requests. Try again later."
        });
      }


      // INCREMENT COUNT
      await redisClient.incr(key);

      next();

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        error: error.message
      });
    }
};

module.exports = rateLimitMiddleware;