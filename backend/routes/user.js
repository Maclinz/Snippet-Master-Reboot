const exppress = require('express');
const {requireSignIn, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { read } = require('../controllers/user');
const router = exppress.Router();

router.get('/profile', requireSignIn, authMiddleware , read)


module.exports = router;