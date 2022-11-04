const mongoose = require('mongoose');

const UserContributionsSchema = new mongoose.Schema({
    likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    liked: {
        type: Boolean,
        default: false,
    },
    bookmark: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    snippets: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snippet',
    },
    bookmarks: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
},{timestamps: true});

module.exports = mongoose.model('UserContributions', UserContributionsSchema);