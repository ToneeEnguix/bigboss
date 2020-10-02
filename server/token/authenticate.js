const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const config = require('./jwtConfig.js');
const users = require("../schemas/users.js");


app.set('key', config.key);

class TokenController {

    async verifyToken(req, res) {

        const token = req.headers['access-token'];

        try {

            if (token) {
                jwt.verify(token, app.get('key'), async (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ message: 'Invalid Token' });
                    } else {

                        const _id = decoded._id

                        const activeUser = await users.findOne({ _id }).populate("wishlist.range").populate("sampleCart.range").populate("cart.range").populate("orders").populate("cart.range.variants.color");

                        const filteredResult = activeUser.cart.filter((item) => {
                            return (item.range.variants[item.variantIndex].stock > 0);

                        });
                        activeUser.cart = filteredResult
                        res.status(200).send({ message: "Access Granted", userData: activeUser });
                    }
                });
            } else {
                res.status(401).send({
                    mensaje: 'Token not provided'
                });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
}
module.exports = new TokenController;