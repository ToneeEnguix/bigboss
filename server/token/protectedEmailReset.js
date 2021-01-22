const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const config = require('./jwtConfig.js');
const users = require("../schemas/users.js");

app.set('key', config.key);

const protectedRoute = express.Router();

protectedRoute.use(async (req, res, next) => {

    try {

        const activeUserid = req.params.id;

        const activeUser = await users.findOne({ id: activeUserid });

        if (activeUser) {
            app.set("personalkey", activeUser.password + "-" + activeUser.dateCreated);

            const token = req.headers['access-token'];

            if (token) {
                jwt.verify(token, app.get('personalkey'), (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ mensaje: 'Invalid Token' });
                    } else {
                        
                        next();
                    }
                });
            } else {
                res.status(401).send({
                    mensaje: 'Token not provided'
                });
            }
        }
        else {

            res.status(404).send();
        }
    }
    catch (error) {
        res.status(500).send();
    }
    }
);

module.exports = protectedRoute;