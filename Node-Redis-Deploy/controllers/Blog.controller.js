const Blog = require('../models/Blog.model'); // Example: Blog model for database

// Controller to fetch blogs
const getBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.find(); // Assuming a Mongoose model
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = getBlog;
