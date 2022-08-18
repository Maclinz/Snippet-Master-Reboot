const exppress = require('express');
const {requireSignIn, adminMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/category');
const { runValidation} = require('../validations');
const { categoryCreateValidator } = require('../validations/category');
const router = exppress.Router();

router.post('/category', categoryCreateValidator, runValidation, requireSignIn, adminMiddleware, create)
    .get('/categories', list)
    .get('/category/:slug', read)
    .delete('/category/:slug', requireSignIn, adminMiddleware, remove);


module.exports = router;