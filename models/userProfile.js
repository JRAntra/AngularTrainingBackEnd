const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const userProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
    },
    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    userEmail: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        // unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    },
    userRole: {
        type: String,
        required: true,
    },
    age: Number,
    gender: String,
    phone: Number
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

UserProfile.generateAuthToken = function () {
    const token = jwt.sign(
        // jwt hold data;
        {
            _id: this._id,
            name: this.name,
            userName: this.name,
            userEmail: this.userEmail,

            userRole: this.userRole,
            age: this.age,
            gender: this.gender,
            phone: this.phone
        },
        // private key;
        config.get("jwtPrivateKey"),
        // expire time;
        { expiresIn: "24h" }
    );
    return token;
};

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string(),
        userName: Joi.string().required(),
        userEmail: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(1024).required(),

        userRole: Joi.string(),
        age: Joi.number(),
        gender: Joi.string(),
        phone: Joi.number(),
    });
    return schema.validate(user);
};

exports.validate = validateUser;
exports.UserProfile = UserProfile;
