const users = require("../schemas/users.js");
const jwt = require('jsonwebtoken');
const config = require('../token/jwtConfig.js');
const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const sendResetPasswordEmail = require("../emailSetup/emailScripts.js");

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

        const userToLog = JSON.parse(req.body.data);

        const receivedPassword = userToLog.password;
        const receivedEmail = userToLog.email;

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

        const userToSave = JSON.parse(req.body.data);

        const receivedPassword = userToSave.password;
        const receivedEmail = userToSave.email;
        const receivedName = userToSave.fullName;

        try {
            const activeUser = await users.findOne({ email: receivedEmail });

            if (activeUser) {
                return res.status(400).json({ message: "Email adress already taken" })
            }

            const hashedPassword = await bcrypt.hash(receivedPassword, saltRounds)
            const newUser = await users.create({ fullName: receivedName, email: receivedEmail, password: hashedPassword });
            const payload = {
                check: true,
                _id: newUser._id
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

        const user = JSON.parse(req.body.data);


        const receivedOldPassword = user.oldpassword;
        const receivedNewPassword = user.newpassword
        const _id = req.decoded._id

        try {
            const activeUser = await users.findOne({ _id: _id });

            const match = await bcrypt.compare(receivedOldPassword, activeUser.password);

            if (match) {

                const hashedPassword = await bcrypt.hash(receivedNewPassword, saltRounds);
                activeUser.password = hashedPassword;
                await activeUser.save();

                res.status(200).json({ message: "Password Changed" })

            } else {
                res.status(401).json({ message: "Wrong password" })
            }
        }
        catch (error) {

            console.log(error)
            res.status(500).send(error);
        }
    }


    async askPasswordReset(req, res) {

        const userEmail = req.params.email;

        try {

            const userToSendEmail = await users.findOne({ email: userEmail });

            if (userToSendEmail) {

                app.set("personalkey", userToSendEmail.password + "-" + userToSendEmail.dateCreated);
                const payload = {
                    check: true,


                };
                const token = jwt.sign(payload, app.get('personalkey'), {
                    expiresIn: 1220,
                });

                const emailData = { _id: userToSendEmail._id, token: token }
                sendResetPasswordEmail(emailData,userEmail);
                res.status(200).send(emailData);
            }
            else {

                res.status(404);
            }



        }

        catch (error) {

            console.log(error)
            res.status(500).send(error);
        }

    }

    async passwordReset(req, res) {

        try {

            const user = JSON.parse(req.body.data);
            const userID = req.params._id;
            const receivedNewPassword = user.newpassword;

            console.log(user.newpassword)

            const hashedPassword = await bcrypt.hash(receivedNewPassword, saltRounds);
            const updatedUser = await users.findByIdAndUpdate(userID, { "password": hashedPassword });

            res.status(200).send({message:"passwordUpdated"});
        }


        catch (error) {

            console.log(error)
            res.status(500).send();
        }
    }


}

module.exports = new UserController;