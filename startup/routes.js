const express = require('express');
const cors = require('cors');
const category = require('../routes/category-route');
const product = require('../routes/product-route');
const user = require('../routes/user-route');
const login = require('../routes/login-router');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use(cors());

    // app.use((req, res, next) => {
    //     res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    //     res.setHeader(
    //         "Access-Control-Allow-Headers",
    //         "Origin,X-Requested-With,Content-Type,Accept, Authorization, bearerToken"
    //     );
    //     res.setHeader(
    //         "Access-Control-Expose-Headers", 
    //         "bearerToken, Origin, X-Requested-With, Content-Type, Accept, Authorization,"
    //     );
    //     res.setHeader("Access-Control-Allow-Methods",
    //         "GET,POST,PATCH,DELETE,OPTIONS,PUT");
    //     next();
    // });
    app.use('/api/category', category);
    app.use('/api/product', product);
    app.use('/api/user', user);
    app.use('/api/login', login);
    // app.use('/api/security',    security    );
    app.use(error);
}
