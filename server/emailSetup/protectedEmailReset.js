const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const users = require("../schemas/users");


const protectedEmailReset = express.Router();

protectedEmailReset.use(async (req, res) => {

    try {

        const activeUserEmail = req.params.email;

        const activeUser = await users.findOne({ email: activeUserEmail });

        if (activeUser) {
            app.set("personalkey", activeUser.password + "-" + activeUser.dateCreated);

            const token = req.headers['access-token'];

            if (token) {
                jwt.verify(token, app.get('personalkey'), (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ mensaje: 'Invalid Token' });
                    } else {
                        req.user = activeUser;
                        res.status(200).send("Access Granted");
                    }
                });
            } else {
                res.status(401).send({
                    mensaje: 'Token not provided'
                });
            }
        }
        else{

            res.status(404).send();
        }
    }
    catch (error) {
        res.status(500).send();
    }
}
);

module.exports = protectedEmailReset;