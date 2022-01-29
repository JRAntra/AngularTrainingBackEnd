const Joi = require("@hapi/joi");
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    introductionDate: {
        type: String,
    },
    price: Number,
    url: String,
    categoryId: String
});


const Product = mongoose.model('product', productSchema);

const validateProduct = (product) => {
    const schema = Joi.object({
        productName: Joi.string(),
        price: Joi.number(),
        url: Joi.string(),
        categoryId: Joi.string(),
        introductionDate: Joi.string()
    });
    return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
