const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/users.js');
const protectedEmailReset = require('../token/protectedEmailReset.js');
const protectedRoute = require("../token/protectedRoute.js");


 router.post('/signin', controller.signIn);

router.post('/signup', controller.signUp);

router.post("/save", protectedRoute,controller.save);

router.post("/newpassword",protectedRoute,controller.newPassword);

// router.get ("/:email/askpasswordreset", controller.askPasswordReset);

// router.post("/:_id/resetpassword",protectedEmailReset,controller.passwordReset)


module.exports = router;