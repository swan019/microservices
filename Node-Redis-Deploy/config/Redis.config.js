const { createClient } = require('redis');

exports.ConnectRedis = async () => {
    try {
        const redisClient = createClient({
            url: process.env.REDIS_URL, // Ensure this environment variable is set
        });

        redisClient.on('error', (err) => {
            console.error('Redis Client Error:', err.message);
        });

        redisClient.on('connect', () => {
            console.log('Redis Client Connected');
        });

        await redisClient.connect(); // Establish the connection

        return redisClient;
    } catch (error) {
        console.error('Error connecting to Redis:', error.message);
        throw error; // Re-throw error for higher-level handling
    }
};
