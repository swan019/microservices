const mongoose = require('mongoose');
const Blog = require('./models/Blog.model'); // Adjust the path to your Blog model
require('dotenv').config();

// Random data generation utility
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Function to seed 200 random documents
const seedBlogs = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB.');

        // Generate 200 random blog documents
        const blogs = [];
        for (let i = 0; i < 100; i++) {
            console.log(i, " : Blog" );
            
            blogs.push({
                title: generateRandomString(10), // Random title of 10 characters
                content: generateRandomString(100), // Random content of 100 characters
            });
        }

        // Insert the random blogs into the database
        await Blog.insertMany(blogs);
        console.log('Successfully seeded 100 random blog documents.');

        // Close the database connection
        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error seeding the database:', error.message);
        mongoose.connection.close();
    }
};

// Run the seeding function
seedBlogs();
