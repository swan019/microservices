const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    if (!process.env.DB_URL) {
        console.error("Error: DB_URL is not set in environment variables");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Successfully connected to the database`);
    } catch (error) {
        console.error("Error in connecting DB:", error.message);
        process.exit(1);
    }

    // Handle app termination for a graceful shutdown
    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    });
};

module.exports = connectDB;
