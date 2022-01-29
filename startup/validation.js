const Joi = require("@hapi/joi"); // validate schema;

module.exports = function (params) {
    Joi.objectId = require('joi-objectid')(Joi); // validate db id;
    // console.log(Joi.objectId);
}