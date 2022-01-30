const express = require('express');
const cors = require('cors');
const register = require('../routes/register');
const login = require('../routes/login');
const news = require('../routes/news');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use(cors());

    app.use('/api/register', register);
    app.use('/api/login', login);
    app.use('/api/news', news);

    // app.use(error);
}
