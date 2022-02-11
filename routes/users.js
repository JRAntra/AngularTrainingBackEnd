const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // hush password
const Joi = require("@hapi/joi");

const { UserProfile } = require('../models/userProfile');

router.get("/getProfile/:userEmail", async (req, res) => {  
    const user = await UserProfile.findOne({ userEmail: req.params.userEmail });
    if (!user) {
        return res.status(404).send("user not found.");
    }
    res.send(user);
});


module.exports = router;