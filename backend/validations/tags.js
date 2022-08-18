const { check } = require('express-validator');

//validate email name and password
exports.tagCreateValidator = [
    check('name').not().isEmpty().withMessage('Tag name is required!'),
]
