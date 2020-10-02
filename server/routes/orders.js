const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/orders');


router.post('/create',controller.create);

 router.get('/read',controller.read);

router.post("/update",controller.update);

router.post("/delete",controller.delete);

router.get("/all", controller.all); 

module.exports = router;
