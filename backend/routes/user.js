const exppress = require('express');
const {requireSignIn, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { read, publicProfile, update, userPhoto } = require('../controllers/user');
const router = exppress.Router();

router.get('/user/profile', requireSignIn, authMiddleware , read)
router.get('/user/:username' , publicProfile)
router.put('/user/update', requireSignIn, authMiddleware, update)
//photo
router.get('/user/photo/:username', userPhoto)


module.exports = router;