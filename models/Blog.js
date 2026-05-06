const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    authorInformation: {
        type: String,
        required: [true, 'Author information is required']
    },
    coverImage: {
        type: String,
        required: false,
        default: 'https://example.com/default-placeholder.png' // Optional default image
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema);