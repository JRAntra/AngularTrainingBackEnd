const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // hush password
const _ = require("lodash");

const { UserProfile, validate } = require("../models/userProfile");

// router.get("/", async (req, res) => {
//     const user = await Product.find().sort({ name: 1 });
//     console.log("get user: ", user);
//     res.send(product);
// });

router.get("/getUserById/:id", async (req, res) => {
    console.log(req.params);
    const user = await UserProfile.findOne({ _id: req.params.id });
    if (!user) {
        return res.status(404).send("user not found.");
    }
    res.send(user);
});

router.get("/checkExistByEmail/:userEmail", async (req, res) => {
    console.log(req.params.userEmail);

    const user = await UserProfile.findOne({ userEmail: req.params.userEmail.toLowerCase() });

    return user ? res.send(true) : res.send(false);

    // if (!user) {
    //     return res.status(404).send(JSON.stringify("Email is OK to use."));
    // }
    // return res.send(JSON.stringify("Email has been registered."));
});

router.get("/checkExistByUsername/:username", async (req, res) => {

    const user = await UserProfile.findOne({ userName: req.params.username});

    return user ? res.send(true) : res.send(false);

    // if (!user) {
    //     return res.status(404).send(JSON.stringify("username is OK to use"));
    // }
    // return res.send(JSON.stringify("username has been used"));

});

router.post("/createNewAccount", async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }

    const userCheck = await UserProfile.findOne({
        userEmail: req.body.userEmail.toLowerCase(),
    });
    if (userCheck) {
        return res.status(400).send("User already registered.");
    }

    const user = new UserProfile({
        name: req.body.name,
        userName: req.body.userName,
        userEmail: req.body.userEmail.toLowerCase(),
        password: req.body.password,

        userRole: 'user',
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
    });
    // Encrypting password;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    // Save to database;
    await user.save();
    // Generate token;
    const token = UserProfile.generateAuthToken.call(user);

    res.header("bearerToken", token).send(
        _.pick(user, ["userEmail", "password", "userRole", "phone"])
    );
});

// router.put("/:id", async (req, res) => {
//     const product = await Product.find({ _id: req.params.id });
//     if (!product) {
//         return res.status(404).send("not found.");
//     }

//     const { error } = validate(req.body);
//     if (error) {
//         return res.status(400).send(error.details[0].message);
//     }

//     await Product.findByIdAndUpdate(
//         req.params.id,
//         { $set: req.body },
//         { new: true }
//     );

//     res.send(await Product.find());
// });

// router.delete("/:id", async (req, res) => {
//     const product = await Product.find({ _id: req.params.id });
//     if (!product) {
//         return res.status(404).send("not found.");
//     }

//     await Product.deleteOne({ _id: req.params.id });
//     res.send(await Product.find());
// });

module.exports = router;


// interface User {
//     ...
//     userRole: 'user' | 'admin',
//     ...
// }