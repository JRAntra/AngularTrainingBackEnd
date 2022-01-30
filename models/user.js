const Joi = require("@hapi/joi");
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    isAdmin: Boolean,
    claim: {
        canAccessCategories: Boolean,
        canAddCategory: Boolean,
        canAccessProducts: Boolean,
        canAddProducts: Boolean,
        canSaveProduct: Boolean,
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        // jwt hold data;
        { 
            _id: this._id, 
            isAdmin: this.isAdmin, 
            userName: this.name, 
            claim: this.claim 
        }, 
        // private key;
        config.get('jwtPrivateKey'),
        // expire time;  
        { expiresIn: '24h' } 
    );
    return token;
}

const User = mongoose.model('user', userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(255).required(),
        isAdmin: Joi.boolean(),
        canAccessProducts: Joi.boolean(),
        canAddProducts: Joi.boolean(),
        canSaveProduct: Joi.boolean(),
        canAccessCategories: Joi.boolean(),
        canAddCategory: Joi.boolean(),
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
