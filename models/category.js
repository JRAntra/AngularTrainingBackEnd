const Joi = require("@hapi/joi");
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: Number,
    categoryName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Category = mongoose.model('category', categorySchema);

const validateCategory = (category) => {
    const schema = Joi.object({
        categoryId: Joi.number(),
        categoryName: Joi.string().min(5).max(50).required(),
    });
    return schema.validate(category);
}

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validate = validateCategory;
