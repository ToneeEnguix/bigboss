const admin = require("../schemas/admin.js");
const jwt = require("jsonwebtoken");
const config = require("../token/jwtConfig.js");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

app.set("key", config.key);

class AdminController {
  async signIn(req, res) {
    const userToLog = JSON.parse(req.body.data);

    const receivedPassword = userToLog.password;
    const receivedName = userToLog.name;

    try {
      const activeUser = await admin.findOne({ name: receivedName });

      if (activeUser === null) {
        res.status(401).json({ message: "No user found" });
      }

      const match = await bcrypt.compare(
        receivedPassword,
        activeUser.adminPassword
      );

      if (match) {
        const payload = {
          check: true,
          _id: activeUser._id,
          admin: true,
        };

        const token = jwt.sign(payload, app.get("key"), {
          expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
        });

        res.status(200).json({
          message: "Correct authentication",
          token: token,
          userData: activeUser,
        });
      } else {
        res.status(401).json({ message: "Wrong password" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async signUp(req, res) {
    const userToSave = JSON.parse(req.body.data);

    const receivedPassword = userToSave.password;
    const receivedName = userToSave.name;

    try {
      const activeUser = await admin.findOne({ name: receivedName });

      if (activeUser) {
        return res.status(400).json({ message: "Name already taken" });
      }

      const hashedPassword = await bcrypt.hash(receivedPassword, saltRounds);
      const newUser = await admin.create({
        name: receivedName,
        adminPassword: hashedPassword,
      });
      const payload = {
        check: true,
        _id: newUser._id,
        admin: true,
      };
      const token = jwt.sign(payload, app.get("key"), {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      });

      res.status(200).json({
        message: "Correct authentication",
        token: token,
        userData: newUser,
        admin: true,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async newPassword(req, res) {
    const user = JSON.parse(req.body.data);

    const receivedOldPassword = user.oldpassword;
    const receivedNewPassword = user.newpassword;
    const _id = req.decoded._id;

    try {
      const activeUser = await users.findOne({ _id: _id });

      const match = await bcrypt.compare(
        receivedOldPassword,
        activeUser.password
      );

      if (match) {
        const hashedPassword = await bcrypt.hash(
          receivedNewPassword,
          saltRounds
        );
        activeUser.password = hashedPassword;
        await activeUser.save();

        res.status(200).json({ message: "Password Changed" });
      } else {
        res.status(401).json({ message: "Wrong password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new AdminController();
