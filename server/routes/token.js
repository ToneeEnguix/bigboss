const express = require("express"),
  router = express.Router(),
  controller = require("../token/authenticate.js");

router.get("/verifytoken", controller.verifyToken);

router.get("/verifytokenemail/:id/:token", controller.verifyEmailToken);

module.exports = router;
