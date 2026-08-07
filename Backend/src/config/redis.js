import redis from 'ioredis';
import env from "./env.js";
import logger from "./logger.js"

const redis = new redis(env.Redis_URL);

redis.on("connection", () => {  //redis emit event on error or when connect this on catches event
    logger.info("Redis connected successfully");
});

redis.on("error", () => {
    logger.error("redis connection failed");
});

export default redis;