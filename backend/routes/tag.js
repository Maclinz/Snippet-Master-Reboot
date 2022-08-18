const exppress = require('express');
const { requireSignIn, adminMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/tags');
const { runValidation } = require('../validations');
const {tagCreateValidator } = require('../validations/tags');
const router = exppress.Router();

router.post('/tag', tagCreateValidator, runValidation, requireSignIn, create)
    .get('/tags', list)
    .get('/tag/:slug', read)
    .delete('/tag/:slug', requireSignIn, remove);


module.exports = router;