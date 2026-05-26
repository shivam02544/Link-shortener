const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: 6379
  }
});

redisClient.on("error", (error) => {
  console.log("Redis Error:", error);
});

(async () => {
  await redisClient.connect();
  console.log("Redis connected");
})();

module.exports = redisClient;