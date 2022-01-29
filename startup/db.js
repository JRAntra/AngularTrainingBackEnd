// const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function (params) {
    const db = config.get("db");

    mongoose.connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        // winston.info(`Connected to ${db}...`);
        console.log(`Connected to ${db}...`);
    });
}
