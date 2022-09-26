const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // hush password
const Joi = require("@hapi/joi");

const { UserProfile } = require('../models/userProfile');

router.post("/", async (req, res) => {


    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await UserProfile.findOne({ userEmail: req.body.userEmail.toLowerCase() });
    if (!user) {
        return res.status(400).send('Cannot find this email.');
    }
    console.log(user);
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    ); // compare password;

    if (!validPassword) {
        return res.status(400).send('Invalid email or password.');
    }

    const token = UserProfile.generateAuthToken.call(user);
    console.log(token);

    const infoBack = {
        name: user.name,
        userName: user.userName,
        userEmail: user.userEmail,

        userRole: user.userRole,
        age: user.age,
        gender: user.gender,
        phone: user.phone,

        bearerToken: token,
    }

    res.header('bearerToken', token).send(infoBack);
});

const validate = (user) => {
    const schema = Joi.object({
        userEmail: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(50).required(),
    });
    return schema.validate(user);
}

module.exports = router;