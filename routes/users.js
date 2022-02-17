const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // hush password
const Joi = require("@hapi/joi");

const { UserProfile } = require('../models/userProfile');

router.get("/getProfile/:username", async (req, res) => {  
    const user = await UserProfile.findOne({ userName: req.params.username });
    if (!user) {
        return res.status(404).send("user not found.");
    }
    res.send(user);
});
router.get("/getAllUsers", async (req, res) => {
    const users = await UserProfile.find().sort({ id: 1 });
    res.send(users);
  });

module.exports = router;