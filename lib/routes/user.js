"use strict";

var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

// Define user routes
router.get('/register', userController.showRegistration);
router.post('/register', userController.performRegistration);
module.exports = router;