
import redis from 'redis';
let redisClient = redis.createClient({
    username: 'default', password: process.env.REDIS_PASSWORD, socket: {
        host: 'redis-19658.c328.europe-west3-1.gce.redns.redis-cloud.com', port: 19658
    }
});
export const initRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis successfully!');
    } catch (err) {
        console.error('Redis connection error:', err);
        console.log('Attempting to connect to local Redis...');
        redisClient = redis.createClient({
            socket: { host: '127.0.0.1', port: 6379 }
        });
        try {
            await redisClient.connect();
            console.log('Connected to local Redis successfully!');
        } catch (localErr) {
            console.error('Local Redis connection error:', localErr);
        }
    }
}
export const cacheData = async (key, data, expiry) => {
    try {
        await redisClient.json.set(key, '$', data);
        await redisClient.expire(key, expiry);
        console.log('Data cached successfully for key:', key);
    } catch (error) {
        console.error('Error caching data for key:', key, error);
    }
};
export const getCachedData = async (key) => {
    try {
        return await redisClient.json.get(key);
    } catch (error) {
        console.error('Error retrieving cached data for key:', key, error);
        return null;
    }
};
