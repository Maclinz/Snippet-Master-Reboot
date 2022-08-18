const mongoose = require('mongoose')

const SnippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        required: true,
        minlength: 3,
    },
    slug: {
        type: String,
        index: true,
        unique: true,
    },
    code: {
        type: {},
        required: true,
        min: 50,
        max: 2000000,
    },
    mtitle: {
        type: String,
    },
    mdesc: {
        type: String,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    categories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tags',
            required: true,
        }
    ],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

module.exports = mongoose.model('Snippet', SnippetSchema)