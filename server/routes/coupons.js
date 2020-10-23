const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/coupons");

router.get("/create", controller.create);

router.get("/read/:coupon", controller.read);

router.post("/update", controller.update);

router.post("/delete", controller.delete);

router.get("/all", controller.all);

module.exports = router;
