const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/orders");

router.post("/create", controller.create);

router.get("/read", controller.read);

router.post("/update", controller.update);

router.post("/delete", controller.delete);

router.get("/all", controller.all);

router.get("/user/:id/:skip", controller.getUserOrders);

router.get("/:competitionId", controller.getCompetitionOrders);

module.exports = router;
