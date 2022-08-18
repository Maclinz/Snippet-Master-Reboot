const CategorySchema = require("../models/CategorySchema");
const slugify = require('slugify');
const{ errorHandler } = require('../helpers/dbErrorHandler');

//Create Category
exports.create = (req, res) => {
    const {name} = req.body;
    let slug = slugify(name).toLowerCase();

    let category = new CategorySchema({name, slug});
    category.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    })
}

//List Category
exports.list = (req, res) => {
    CategorySchema.find({}, (err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    }).select('name slug');
}

//Read Category
exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    CategorySchema.findOne({slug}, (err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    }).select('name slug');
}   

//Remove Category
exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    CategorySchema.findOneAndRemove({slug}, (err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Category deleted successfully'
        });
    }).select('name slug');
}