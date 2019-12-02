const jwt = require('jsonwebtoken');
const tokenSecret = require("../../config/secretKey.json").token_secret;

async function verifyToken(request, response, next, token) {
    try {
        if(!token) {
            return response.status(401).send("Access denied.");
        }
        const verified = await jwt.verify(token, tokenSecret);
        request.user = verified;
        next();
    } catch (err) {
        response.status(401).send("Unauthorized.Access denied.");
    }
}

async function verifyLoginToken(request, response, next) {
    try {
        const token = request.header("Authorization").split('Bearer ')[1];
        verifyToken(request, response, next, token);
    } catch (err) {
        response.status(401).send("Unauthorized.Access denied.");
    }
}

async function verifyRegisterToken(request, response, next) {
    try {
        const token = request.header("auth-token");
        verifyToken(request, response, next, token);
    } catch (err) {
        response.status(401).send("Unauthorized.Access denied.");
    }
}

module.exports = {verifyLoginToken, verifyRegisterToken};