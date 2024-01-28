"use strict";

var express = require('express');
var router = express.Router();
var qrController = require('../controllers/qrController');

// Define QR routes
router.get('/generate', qrController.showQRGeneration);
router.post('/generate', qrController.generateQR);
module.exports = router;