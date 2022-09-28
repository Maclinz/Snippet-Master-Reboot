const SnippetSchema = require('../models/SnippetSchema');
const formidable = require('formidable');
const slugify = require('slugify');
const {stripHtml} = require('string-strip-html');
const _ = require('lodash');
const Tags = require('../models/TagsSchema');
const Category = require('../models/CategorySchema');
const {errorHandler} = require('../helpers/dbErrorHandler');
const {readFileSync} = require('fs');

exports.create = (req, res) => {
    const {title, code, categories, tags} = req.body;

    //validate data
    if(!title){
        return res.status(400).json({
            error: 'Title is required'
        });
    }
    if(!code){
        return res.status(400).json({
            error: 'Code is required'
        });
    }
    
    if(!tags || tags.length == 0){
        return res.status(400).json({
            error: 'At least one tag is required'
        });
    }

    //check code length
    if(code.length < 50 || code.length > 2000000){
        return res.status(400).json({
            error: 'Code must be between 50 and 2000000 characters!'
        });
    }

    //create snippet
    let slug = slugify(title).toLowerCase();
    let mtitle = `${title} | Snippet Master`;

    let snippet = new SnippetSchema({
        title,
        code,
        categories,
        slug,
        mtitle,
        postedBy: req.auth._id
    })
    
    //save snippet
    snippet.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        //res.json(data);
        //find based on id
        SnippetSchema.findByIdAndUpdate(data._id, {$push: {tags: tags}}, {new: true}).exec((err, data) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        })
    })

}

exports.listSnippets = (req, res) => {
    SnippetSchema.find({})
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username profile')
        .select('_id title slug code mtitle postedBy createdAt updatedAt')
    .exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    })
}

exports.listSnippetsandTags = (req, res) => {
    //limit request to 10 coming from the frontend
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let snippets
    let tags
    //let categories

    SnippetSchema.find({})
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username profile')
        //sort based on latest createdAt
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('_id title slug code mtitle postedBy createdAt updatedAt')
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            snippets = data;
            //get tags
            Tags.find({}).exec((err, data) => {
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                tags = data;
            })
            //return all snippets and tags
            res.json({
                snippets,
                tags,
                size: snippets.length
            });
        })

}

exports.readSnippet = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    SnippetSchema.findOne({slug})
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug mtitle code tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        })
}

exports.removeSnippet = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    SnippetSchema.findOneAndRemove({slug})
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json({
                message: 'Snippet deleted successfully'
            });
        })
}

exports.updateSnippet = (req, res) => {
    //Update snippet
    const { title, code, categories, tags } = req.body;

    //slug
    let snippetSlug = req.params.slug.toLowerCase();

    SnippetSchema.findOne({slug: snippetSlug})
        .exec((err, oldSnippet) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            if (code.length < 50 || code.length > 2000000) {
                return res.status(400).json({
                    error: 'Code must be between 50 and 2000000 characters!'
                });
            }

            //keep old slug
            let prevSlug = oldSnippet.slug;   
            oldSnippet = _.merge(oldSnippet, {
                title,
                code,
                categories,
                tags,
            });
            oldSnippet.slug = prevSlug;

            //save snippet
            oldSnippet.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json(data);
            })
        })

}

//search snippets
exports.searchSnippets = (req, res) => {
    const {search} = req.query;
    if(search){
        SnippetSchema.find({
            $or: [{title: {$regex: search, $options: 'i'}}, {code: {$regex: search, $options: 'i'}}]
        },(err, snippets) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(snippets);
        }).populate('tags', '_id name slug').populate('postedBy', '_id name username').select('_id title tags slug code mtitle postedBy createdAt updatedAt');
    }
}

//bookmark snippet
exports.bookmarkUserSnippet = (req, res) => {
    SnippetSchema.findByIdAndUpdate(req.body.snippetId, {$push: {bookmarks: req.auth._id}}, {new: true}).exec((err, result) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(result);
    })
};