const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { Product, validate } = require('../models/product');


router.get("/", auth, async (req, res) => {
    const id = req._id;
    console.log(id);

    const product = await Product.find().sort({ introductionDate: 1 });
    res.send(product);
});

router.get("/:id", async (req, res) => {

    console.log(req.params);
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
        return res.status(404).send("product not found.");
    }

    res.send(product);
});

router.post("/", async (req, res) => {
    console.log('req.body: ', req.body);
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const product = new Product({
        productName: req.body.productName,
        price: req.body.price,
        url: req.body.url,
        categoryId: req.body.categoryId,
        introductionDate: req.body.introductionDate
    });
    console.log("product: ", product);
    await product.save();

    res.send(await Product.find());
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