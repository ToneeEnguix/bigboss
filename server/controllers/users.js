const users = require("../schemas/users.js");
const jwt = require('jsonwebtoken');
const config = require('../token/jwtConfig.js');
const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.set('key', config.key);


class UserController {

    async save(req, res) {

        const userToSave = JSON.parse(req.body.user);

        const _id = req.decoded._id

        try {
            let user = await users.findOneAndUpdate({ _id: _id }, userToSave);
            res.status(200).send(user);
        }

        catch (error) {

            res.status(500).send(error);
        }
    }

    async signIn(req, res) {

        const receivedPassword = req.body.password;
        const receivedEmail = req.body.email;

        try {
            const activeUser = await users.findOne({ email: receivedEmail })

            if (activeUser === null) {

                res.status(401).json({ message: "No user found with that email" })
            }


            const match = await bcrypt.compare(receivedPassword, activeUser.password);

            if (match) {
                const payload = {
                    check: true,
                    _id: activeUser._id
                };

                const token = jwt.sign(payload, app.get('key'), {
                    expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
                });


                res.status(200).json({
                    message: 'Correct authentication',
                    token: token,
                    userData: activeUser,
                });
            } else {
                res.status(401).json({ message: "Wrong password" })
            }
        }
        catch (error) {

            res.status(500).send(error);
        }
    }

    async signUp(req, res) {

        const receivedPassword = req.body.password;
        const receivedEmail = req.body.email;
        const receivedName = req.body.name;

        try {
            const activeUser = await users.findOne({ email: receivedEmail });

            if (activeUser) {
                return res.status(400).json({ message: "Email adress already taken" })
            }

            const hashedPassword = await bcrypt.hash(receivedPassword, saltRounds)
            const newUser = await users.create({ name: receivedName, email: receivedEmail, password: hashedPassword });
            const payload = {
                check: true,
                _id: activeUser._id
            };
            const token = jwt.sign(payload, app.get('key'), {
                expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
            });

            res.status(200).json({
                message: 'Correct authentication',
                token: token,
                userData: newUser
            });

        }
        catch (error) {

            res.status(500).send(error);
        }
    }

    async newPassword(req, res) {

        const receivedOldPassword = req.body.oldPassword;
        const receivedNewPassword= req.body.newPassword
        const _id = req.decoded._id

        try {
            const activeUser = await users.findOne({ _id:_id });

            const match = await bcrypt.compare(receivedOldPassword, activeUser.password);

            if (match) {

                const hashedPassword = await bcrypt.hash(receivedNewPassword, saltRounds);
                activeUser.password=hashedPassword;
                await activeUser.save();
            
                res.status(200).json({message:"Password Changed"})

            } else {
                res.status(401).json({ message: "Wrong password" })
            }
        }
        catch (error) {
            console.log(error)

            res.status(500).send(error);
        }
    }


}

module.exports = new UserController;