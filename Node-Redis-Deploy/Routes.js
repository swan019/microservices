const express = require('express');
const router = express.Router();

const getBlog = require('./controllers/Blog.controller');

// Define the route
router.get('/api/blogs', getBlog);

module.exports = router;
