const exppress = require('express');
const { requireSignIn, adminMiddleware, authMiddleware } = require('../controllers/auth');
const { create, listSnippets, listSnippetsandTags, 
    readSnippet, removeSnippet, updateSnippet, 
    searchSnippets, bookmarkUserSnippet, unbookmarkUserSnippet, listBookmarkedSnippets, unlikeSnippet, likeSnippet } = require('../controllers/snippet');
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
    .post('/snippet/bookmark/:slug', requireSignIn, authMiddleware, bookmarkUserSnippet)
    //unbookmark snippet
    .post('/snippet/unbookmark/:slug', requireSignIn, authMiddleware, unbookmarkUserSnippet)
    //get bookmarked snippets
    .get('/user/bookmarks', requireSignIn, authMiddleware, listBookmarkedSnippets)
    //like snippet
    .put('/snippet/like/:id', requireSignIn, authMiddleware, likeSnippet)
    //unlike snippet
    .put('/snippet/unlike/:id', requireSignIn, authMiddleware, unlikeSnippet)



module.exports = router;