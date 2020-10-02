const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const config = require('./jwtConfig.js');
const users = require("../schemas/users.js");

app.set('key', config.key);

const protectedRoute = express.Router();

protectedRoute.use(async (req, res, next) => {

    const token = req.headers['access-token'];

    if (token) {
        
        jwt.verify(token, app.get('key'), (err, decoded) => {
            if (err) {

                res.status(401).send({ message: "Invalid Token" })

            }
            else {
                req.decoded = decoded;
                next();
            }
        }
        );

    }
    else {
        res.status(401).send({
            message: 'Token not provided'
        });
    }
});

module.exports = protectedRoute;