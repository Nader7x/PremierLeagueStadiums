// @ts-check
import redis from 'redis';

let redisClient;

export const initRedis = async () => {
    redisClient = redis.createClient({
        username: 'default',
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST || 'redis-19658.c328.europe-west3-1.gce.redns.redis-cloud.com',
            port: Number(process.env.REDIS_PORT) || 19658
        }
    });

    try {
        await redisClient.connect();
        console.log('Connected to Redis successfully!');
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
    } catch (err) {
        console.error('Redis connection error:', err);
        console.log('Attempting to connect to local Redis...');
        try {
            await redisClient.quit().catch(() => {});
        } catch(qErr) {}

        redisClient = redis.createClient({
            socket: { host: '127.0.0.1', port: 6379 }
        });

        try {
            await redisClient.connect();
            console.log('Connected to local Redis successfully!');
            redisClient.on('error', (localErr) => console.log('Local Redis Client Error', localErr));
        } catch (localErr) {
            console.error('Local Redis connection error:', localErr);
            throw localErr;
        }
    }
};

export const cacheData = async (key, data, expiry) => {
    try {
        await redisClient.json.set(key, '$', data, { EX: expiry });
        console.log('Data cached successfully for key:', key);
    } catch (error) {
        console.error('Error caching data for key:', key, error);
    }
};

export const getCachedData = async (key) => {
    try {
        const result = await redisClient.json.get(key);
        if (result) {
            return result;
        }
        return null;
    } catch (error) {
        console.error('Error retrieving cached data for key:', key, error);
        return null;
    }
};
