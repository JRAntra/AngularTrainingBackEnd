const winston = require('winston'); // create error log;
// require('winston-mongodb'); // create error log in mongodb;
require('express-async-errors'); // catch errors with try catch with async method, see async.js middleware;

module.exports = function (params) {
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );
    process.on('uncaughtRejection', (ex) => { throw ex; });

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    // winston.add(new winston.transports.MongoDB({
    //     db: 'mongodb://localhost:27017/david',
    //     level: 'info',
    //     collection: 'log'
    // }));
}