const jwt = require('jsonwebtoken');
const tokenSecret = require("../../config/secretKey.json").token_secret;

module.exports = async function (request, response, next) {
    const token = request.header("auth-token");
    if(!token) {
        return response.status(401).send("Access denied.");
    }
    try {
        const verified = await jwt.verify(token, tokenSecret);
        request.user = verified;
        next();
    } catch (err) {
        response.status(400).send("Invalid token");
    }
}