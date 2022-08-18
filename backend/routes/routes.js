const exppress = require('express');
const { signUp, signIn, signout, requireSignIn } = require('../controllers/auth');
const { runValidation } = require('../validations');
const { useSignUpValidator, useSignInValidator } = require('../validations/auth');

const router = exppress.Router();

router.post('/signup', useSignUpValidator, runValidation, signUp )
    .post('/signin', useSignInValidator, runValidation, signIn)
    .get('/signout', signout)
    /*.get('/test', requireSignIn, (req, res) => {
        res.json({
            user: req.auth
        })
    })**/


module.exports = router;