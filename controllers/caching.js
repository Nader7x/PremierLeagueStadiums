// @ts-check

import redis from 'redis';
let redisClient = redis.createClient({
    username: 'default', password: process.env.REDIS_PASSWORD, socket: {
        host: 'redis-19658.c328.europe-west3-1.gce.redns.redis-cloud.com', port: 19658
    }
});
export const initRedis = async () => {
    await redisClient.connect().catch(e => console.error(e));
    console.log('Connected to Redis successfully!');
    redisClient.on("error", (err) => console.log("Redis Client Error", err));
}
export const cacheData = async (key, data, expiry) => {
    await redisClient.json.set(key, '$', data);
    await redisClient.expire(key, expiry);
    console.log('Data cached successfully for key:', key);
};
export const getCachedData = async (key) => {
    return await redisClient.json.get(key);
};
