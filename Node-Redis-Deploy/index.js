const express = require('express');
const connectDB = require('./config/DB.config');
const { ConnectRedis } = require('./config/Redis.config');
const router = require('./Routes');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

let redisConnectionClient;

(async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Connect to Redis
        redisConnectionClient = await ConnectRedis();
        console.log('All services are connected.');

        // Middleware and routes
        app.use((req, res, next) => {
            req.redisClient = redisConnectionClient; // Attach Redis client to the request object
            next();
        });

        app.use(router);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing services:', error.message);
        process.exit(1);
    }
})();
