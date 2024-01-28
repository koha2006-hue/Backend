const express = require('express');
const router = express.Router();
const personalQRController = require('../controllers/personalQRController');

// Define personal QR routes
router.get('/generate', personalQRController.showPersonalQRGeneration);
router.post('/generate', personalQRController.generatePersonalQR);
router.get('/scan/:id', personalQRController.scanPersonalQR);
router.get('/profile/:id', personalQRController.showProfile);
router.get('/edit/:id', personalQRController.editPersonalQR);

module.exports = router;
