const exppress = require('express');
const { requireSignIn, adminMiddleware, authMiddleware } = require('../controllers/auth');
const { create, listSnippets, listSnippetsandTags, 
    readSnippet, removeSnippet, updateSnippet, 
    searchSnippets, bookmarkUserSnippet, likes,unbookmarkUserSnippet, listBookmarkedSnippets, unlikeSnippet, likeSnippet, readSnippetById } = require('../controllers/snippet');
const { runValidation } = require('../validations');
const router = exppress.Router();

router.post('/create-snippet',  requireSignIn, adminMiddleware, create)
    .get('/', (req, res) => {
        res.send('hello world')
    })
    .get('/snippets', listSnippets)
    .get('/snippet/:slug', readSnippet )
    .post('/snippets-tags-categories', listSnippetsandTags )
    .delete('/snippet/:slug', requireSignIn, authMiddleware, removeSnippet )
    .put('/snippet/:slug',  updateSnippet )
    .get('/snippets/search', searchSnippets)
    //auth user crud
    .post('/user/create-snippet', requireSignIn, authMiddleware, create)
    //bookmark snippet
    .put('/snippet/bookmark/:id', requireSignIn, authMiddleware, bookmarkUserSnippet)
    //get bookmarked snippets

    //like snippet
    .put('/snippet/like/:id', requireSignIn, authMiddleware, likeSnippet )
    //get by id
    .get('/single-snippet/:id', readSnippetById)

module.exports = router;