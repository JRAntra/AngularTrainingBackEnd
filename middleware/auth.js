const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    let token = req.header('authorization'); // get the token from the req header;
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    token = token.split('Bearer').join('');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')); // decode the token and check if it save with salt part;
        req._id = decoded._id; // get the user info from the jwt;
        next(); // give the control to callback function (req, res) => {};
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}