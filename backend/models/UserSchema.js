const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 35,
        minlength: 3,
        unique: true,
        index: true,
        lowercase: true,
    },
    name: {
        type: String,
        trim: true,
        maxlength: 35,
        minlength: 3,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    profile: {
        type: String,
        lowercase: true,
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Snippet',
        }
    ],
    liked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Snippet',
        }
    ],
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    about: {
        type: String,
    },
    github: {
        type: String,
        maxlength: 100,
    },
    linkedin: {
        type: String,
        maxlength: 100,
    },
    mail: {
        type: String,
        maxlength: 100,
    },
    role: {
        type: Number,
        default: 0,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    resetPasswordLink: {
        data: String,
        default: '',
    }
}, {timestamps: true});


userSchema.virtual('password').set(function (password) {
    // create a temporary variable called _password
    this._password = password;
    // generate a timestamp
    this.salt = this.makeSalt();
    // encrypt password
    this.hashed_password = this.encryptPassword(password);
}).get(function () {
    return this._password;
});

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (err) {
            return '';
        }
    }
}


module.exports = mongoose.model('User', userSchema);