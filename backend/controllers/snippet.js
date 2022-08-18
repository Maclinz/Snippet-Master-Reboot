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
    /*
    if(!tags || tags.length == 0){
        return res.status(400).json({
            error: 'At least one tag is required'
        });
    }*/

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