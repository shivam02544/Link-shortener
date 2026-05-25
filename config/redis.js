const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("error", (error) => {
  console.log("Redis Error:", error);
});

(async () => {
  await redisClient.connect();
  console.log("Redis connected");
})();

module.exports = redisClient;