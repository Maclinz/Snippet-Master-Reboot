const TagsSchema = require('../models/TagsSchema');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');


//Create Tag
exports.create = (req, res) => {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();

    let category = new TagsSchema({ name, slug });
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    })
}

//List Tags
exports.list = (req, res) => {
    TagsSchema.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    }).select('name slug');
}

//Read Tag
exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    TagsSchema.findOne({ slug }, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    }).select('name slug');
}

//Remove Tag
exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    TagsSchema.findOneAndRemove({ slug }, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Tag deleted successfully'
        });
    }).select('name slug');
}