const Joi = require("@hapi/joi");
const mongoose = require('mongoose');

const userClaimSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    claimType: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    claimValue: Boolean
});


const Claim = mongoose.model('claim', userClaimSchema);

const validateClaim = (claim) => {
    const schema = Joi.object({
        userId: Joi.string(),
        claimType: Joi.string(),
        claimValue: Joi.string()
    });
    return schema.validate(claim);
}

exports.Claim = Claim;
exports.validate = validateClaim;
