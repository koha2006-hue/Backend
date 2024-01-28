const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

// Define QR routes
router.get('/qr_generate/:id', qrController.showQRGeneration);
router.post('/generate', qrController.generateQR);
module.exports = router;
