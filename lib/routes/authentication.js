"use strict";

var express = require('express');
var router = express.Router();
var authenticationController = require('../controllers/authenticationController');

// Define authentication routes
router.get('/', authenticationController.login);
router.post('/login', authenticationController.performLogin);
router.get('/logout', authenticationController.logout);
module.exports = router;