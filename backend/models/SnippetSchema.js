const mongoose = require('mongoose')

const SnippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        required: true,
        minlength: 3,
    },
    code: {
        type: String,
        required: true
    },
    language: String,
    icon: String,
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    slug: {
        type: String,
        unique: true,
        index: true
    },
    mtitle: {
        type: String,
    },
    bookmark: {
        type: Boolean,
        default: false,
    },
    mdesc: {
        type: String,
    },
    public: {
        type: Boolean,
        default: false,
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