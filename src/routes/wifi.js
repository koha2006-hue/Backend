const express = require('express');
const router = express.Router();
const wifiController = require('../controllers/wifiController');

// Define Link QR routes
router.get('/generate', wifiController.showWifiQRGeneration);
router.post('/generate', wifiController.generateWifiQR);

router.get('/edit/:id', wifiController.editWifi);
router.post('/edit/:id', wifiController.saveWifiChanges);

module.exports = router;