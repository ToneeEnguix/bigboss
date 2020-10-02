const express = require('express'),
    router = express.Router(),
    controller = require('../token/authenticate.js');


router.get('/verifytoken', controller.verifyToken);


module.exports = router;