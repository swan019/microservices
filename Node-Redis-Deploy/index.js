const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/DB.config');
const router = require('./Routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
