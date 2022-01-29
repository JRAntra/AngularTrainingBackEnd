const express = require('express');
const router = express.Router();

const { Category, validate } = require('../models/category');


router.get("/", async (req, res) => {
    const category = await Category.find().sort({ categoryName: 1 });
    // console.log("get category: ", category);
    res.send(category);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const category = new Category({
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
    });
    console.log("category: ", category);
    await category.save();

    res.send(await Category.find());
});

router.put("/:id", async (req, res) => {
    const category = await Category.find({ _id: req.params.id });
    if (!category) {
        return res.status(404).send("not found.");
    }

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    await Category.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );

    res.send(await Category.find());
});

router.delete("/:id", async (req, res) => {
    const category = await Category.find({ _id: req.params.id });
    if (!category) {
        return res.status(404).send("not found.");
    }

    await Category.deleteOne({ _id: req.params.id });
    res.send(await Category.find());
});

module.exports = router;