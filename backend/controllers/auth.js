const UserSchema = require("../models/UserSchema")
const shortId = require('shortid');
const jwtT = require('jsonwebtoken');
var { expressjwt: jwt } = require("express-jwt");

require('dotenv').config();


exports.signUp = (req, res) => {
    const {name, email, password } = req.body;
    
    //check if user already exists
    UserSchema.findOne({email}).exec((err, user) => {
        if(user){
            return res.status(400).json({
                error: "User already exists"
            })
        }
        //create a new user
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new UserSchema({
            name,
            email,
            password,
            profile,
            username
        });
        newUser.save((err, success) => {
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            res.json({
                message: "Signup successfull"
            })

        })
    })

}

exports.signIn = (req, res) => {
    //check if user already exists
    const {email, password} = req.body;
    UserSchema.findOne({email}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User with that email does not exist"
            })
        }
        //authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: "Email and password do not match"
            })
        }
        //generate a token and send to client
        const token = jwtT.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });

        //cookie 
        res.cookie("token", token, { expiresIn: '1d' });

        //user
        const {_id, username, name, email, role} = user;
        return res.json({
            token,
            user,
        })
    })

}

exports.requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ["HS256"],
});


exports.signout = (req, res) => {
    //clear cookie after signout
    res.clearCookie("token");
    res.json({
        message: "Signout successfull"
    })
}

exports.authMiddleware = (req, res, next) => {
    const authUserId = req.auth._id;
    
    //find user by id
    UserSchema.findById(authUserId).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        //add user to request
        req.profile = user;
        next();
    })
}

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.auth._id;
    UserSchema.findById(adminUserId).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        if(user.role !== 1){
            return res.status(400).json({
                error: "Admin resource. Access denied"
            })
        }
        req.profile = user;
        next();
    } )
}
