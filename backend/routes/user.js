const exppress = require('express');
const {requireSignIn, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { read, publicProfile } = require('../controllers/user');
const router = exppress.Router();

router.get('/profile', requireSignIn, authMiddleware , read)
router.get('/user/:username' , publicProfile)


module.exports = router;