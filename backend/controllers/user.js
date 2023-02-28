const UserSchema = require('../models/UserSchema');
const SnippetSchema = require('../models/SnippetSchema');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const {errorHandler} = require('../helpers/dbErrorHandler');

//returns a user that is signed in
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
}

exports.publicProfile = (req, res) => {
    let username = req.params.username;
    let user;
    let snippets;
    UserSchema.findOne({username}).exec((err, userFromDb) => {
        if(err || !userFromDb) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        user = userFromDb;
        let userId = user._id;

        //query snippets baseed on user id
        SnippetSchema.find({postedBy: userId})
            .populate('postedBy', '_id name username')
            .populate('tags', '_id name slug')
            .select('_id title description code likes liked likedBy language icon bookmarks language slug postedBy createdAt updatedAt')
            .limit(10)
            .exec((err, data) => {
                if(err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                user.photo = undefined;
                user.hashed_password = undefined;
                res.json({
                    user,
                    snippets: data
                })
            })
    })
}

//user update
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            })
        }
        //check for all fields
        let user = req.profile;
        user = _.extend(user, fields);
        user.updated = Date.now();

        //validate password
        if(fields.password && fields.password.length < 6) {
            return res.status(400).json({
                error: 'Password should be min 6 characters long'
            })
        }

        if(files.photo) {
            if(files.photo.size > 1000000) {
                //error if photo is greater than 1mb
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                })
            }
            user.photo.data = fs.readFileSync(
                //get file path
                files.photo.filepath, "utf8"
            );
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        })
    });
}

//photo FOR USER
exports.userPhoto = (req, res) => {
    const username = req.params.username;
    UserSchema.findOne({username}).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        if(user.photo.data) {
            res.set('Content-Type', user.photo.contentType);
            return res.send(user.photo.data);
        }
    })
}    