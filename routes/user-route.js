const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // hush password
const _ = require('lodash');

const { User, validate } = require('../models/user');


router.get("/", async (req, res) => {
    const user = await Product.find().sort({ name: 1 });
    console.log("get user: ", user);
    res.send(product);
});

router.get("/:id", async (req, res) => {
    console.log(req.params);
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return res.status(404).send("user not found.");
    }

    res.send(user);
});

router.post("/", async (req, res) => {
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user1 = await User.findOne({ name: req.body.name });
    if (user1) {
        return res.status(400).send('User already registered.');
    }

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        claim: {
            canAccessCategories: req.body.canAccessCategories,
            canAddCategory: req.body.canAddCategory,
            canAccessProducts: req.body.canAccessProducts,
            canAddProducts: req.body.canAddProducts,
            canSaveProduct: req.body.canSaveProduct,
        }
    });
    const salt = await bcrypt.genSalt(10); // system hold this part for every user;
    user.password = await bcrypt.hash(user.password, salt); // create password;
    
    await user.save();

    const token = user.generateAuthToken(); // put the jwt token in the header
    
    res.header('bearerToken', token)
        .send(_.pick(user, ['name', 'password', 'isAdmin', 'claim']));

});

router.put("/:id", async (req, res) => {
    const product = await Product.find({ _id: req.params.id });
    if (!product) {
        return res.status(404).send("not found.");
    }

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    await Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );

    res.send(await Product.find());
});

router.delete("/:id", async (req, res) => {
    const product = await Product.find({ _id: req.params.id });
    if (!product) {
        return res.status(404).send("not found.");
    }

    await Product.deleteOne({ _id: req.params.id });
    res.send(await Product.find());
});

module.exports = router;