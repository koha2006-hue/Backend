"use strict";

var express = require('express');
var router = express.Router();
var imageController = require('../controllers/imageController');

// Define image routes
router.get('/upload', imageController.showImageUpload);
router.post('/upload', imageController.uploadImage);
module.exports = router;