const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/routes')(app);

const port = process.env.PORT || 4231;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

module.exports = server;

// const routerDebugger = require('debug')('app:debugrouter');
// routerDebugger('show this message');

// in terminal: DEBUG=app:* nodemon index.js
