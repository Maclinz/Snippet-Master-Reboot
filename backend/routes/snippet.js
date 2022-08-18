const exppress = require('express');
const { requireSignIn, adminMiddleware } = require('../controllers/auth');
const { create} = require('../controllers/snippet');
const { runValidation } = require('../validations');
const router = exppress.Router();

router.post('/create-snippet',  requireSignIn, create)



module.exports = router;