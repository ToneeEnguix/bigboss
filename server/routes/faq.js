const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/faq');


router.get('/create',controller.create);

router.post("/update", controller.update);

router.post("/delete",controller.delete);

router.get("/all", controller.all); 

module.exports = router;
