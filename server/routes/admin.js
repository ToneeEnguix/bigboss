const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/admin.js');
const protectedRoute = require("../token/protectedRoute.js");


 router.post('/signin', controller.signIn);

router.post('/signup', controller.signUp);

router.post("/newpassword",protectedRoute,controller.newPassword) 


module.exports = router;