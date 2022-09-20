const UserSchema = require('../models/UserSchema');
const SnippetSchema = require('../models/SnippetSchema');

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
            .select('_id title description code language postedBy createdAt updatedAt')
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