const config = require('config'); // set config files;

module.exports = function (params) {

    if (!config.get('jwtPrivateKey')) {
        throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
    }
}