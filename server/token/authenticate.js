const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const config = require("./jwtConfig.js");
const users = require("../schemas/users.js");

app.set("key", config.key);

class TokenController {
  async verifyToken(req, res) {
    const token = req.params.token;

    try {
      if (token) {
        jwt.verify(token, app.get("key"), async (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Invalid Token" });
          } else {
            const _id = decoded._id;

            const activeUser = await users.findOne({ _id });

            if (activeUser) {
              res
                .status(200)
                .send({ message: "Access Granted", userData: activeUser });
            } else res.status(404).send();
          }
        });
      } else {
        res.status(401).send({
          mensaje: "Token not provided",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }

  async verifyEmailToken(req, res) {
    try {
      const activeUserid = req.params.id;
      const activeUser = await users.findOne({ _id: activeUserid });
      if (activeUser) {
        app.set(
          "personalkey",
          activeUser.password + "-" + activeUser.dateCreated
        );

        const token = req.params.token;
        if (token) {
          jwt.verify(token, app.get("personalkey"), (err, decoded) => {
            if (err) {
              return res.status(401).json({ mensaje: "Invalid Token" });
            } else {
              res.status(200).send({ message: "Access Granted" });
            }
          });
        } else {
          res.status(401).send({
            mensaje: "Token not provided",
          });
        }
      } else {
        res.status(404).send({ mensaje: "No user found" });
      }
    } catch (error) {
      res.status(500).send();
    }
  }
}
module.exports = new TokenController();
