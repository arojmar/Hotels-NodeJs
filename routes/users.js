var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');



router.get('/login', userController.loginUser);

router.post('/checkLogin', userController.checkLogin);

router.get('/register', userController.registerNewUser); 

router.post('/registered', userController.registered); 

module.exports = router;
