const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // hush password
const Joi = require("@hapi/joi");

const { User } = require('../models/user');

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ name: req.body.userName });
    if (!user) {
        return res.status(400).send('Invalid email or password.');
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    ); // compare password;

    if (!validPassword) {
        return res.status(400).send('Invalid email or password.');
    }

    const token = user.generateAuthToken();

    const infoBack = {
        userName: user.name,
        bearerToken: token,
        isAuthenticated: user.isAdmin,
        claim: {
            canAccessProducts: user.claim.canAccessProducts,
            canAddProducts: user.claim.canAddProducts,
            canSaveProduct: user.claim.canSaveProduct,
            canAccessCategories: user.claim.canAccessCategories,
            canAddCategory: user.claim.canAddCategory,
        }
    }

    res.header('bearerToken', token).send(infoBack);
});

const validate = (user) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(3).max(255).required(),
    });
    return schema.validate(user);
}

module.exports = router;