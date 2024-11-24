const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Blog', BlogSchema);
