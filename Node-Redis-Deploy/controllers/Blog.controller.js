const Blog = require('../models/Blog.model');

const getBlog = async (req, res) => {
    const redisClient = req.redisClient; // Get the Redis client from the request object

    try {
        const cachedBlogs = await redisClient.get('blogs'); // Fetch cached blogs

        console.log("cachedBlogs By Redis");
        

        if (cachedBlogs) {
            return res.status(200).json({ success: true, data: JSON.parse(cachedBlogs) });
        }

        // Fetch blogs from the database
        const blogs = await Blog.find();

        console.log("Blog By DB");
        

        // Cache the blogs in Redis for future requests
        await redisClient.set('blogs', JSON.stringify(blogs));

        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = getBlog;
