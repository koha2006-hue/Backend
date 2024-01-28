const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Define image routes
router.get('/upload', imageController.showImageUpload);
router.post('/upload', imageController.uploadImage);

module.exports = router;
