const exppress = require('express');
const { requireSignIn, adminMiddleware, authMiddleware } = require('../controllers/auth');
const { create, listSnippets, listSnippetsandTags, readSnippet, removeSnippet, updateSnippet, searchSnippets} = require('../controllers/snippet');
const { runValidation } = require('../validations');
const router = exppress.Router();

router.post('/create-snippet',  requireSignIn, adminMiddleware, create)
    .get('/snippets', listSnippets)
    .get('/snippet/:slug', readSnippet )
    .post('/snippets-tags-categories', listSnippetsandTags )
    .delete('/snippet/:slug', requireSignIn, authMiddleware, removeSnippet )
    .put('/snippet/:slug',  updateSnippet )
    .get('/snippets/search', searchSnippets)



module.exports = router;