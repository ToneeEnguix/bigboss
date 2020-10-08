const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/competitions.js');


 router.post('/create',controller.create);

  router.get("/randompicks",controller.randomPicks);

router.get('/read/:id',controller.read);

router.post("/update",controller.update);

router.post("/delete",controller.delete);

router.get("/all", controller.all);

router.get("/winners",controller.finished);

router.get("/entries",controller.withEntries)

module.exports = router;