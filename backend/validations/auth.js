const {check} = require('express-validator');

//validate email name and password
exports.useSignUpValidator = [
    check('name').not().isEmpty().withMessage('Name is required!'),
    check('email').isEmail().withMessage('Email is required and Must be Valid!'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long!')
]

exports.useSignInValidator = [
    check('email').isEmail().withMessage('Email is required and Must be Valid!'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long!')
]