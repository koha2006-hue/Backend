const express = require('express');
const router = express.Router();
const personalDataController = require('../controllers/personalDataController');

// Define personal QR routes
router.get('/generate', personalDataController.showPersonalDataQRGeneration);
router.post('/generate', personalDataController.GeneratePersonalDataQR);
router.get('/profile/:id', personalDataController.scanPersonalDataQR);
router.get('/edit/:id', personalDataController.showProfile);
module.exports = router;
