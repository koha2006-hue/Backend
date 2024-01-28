const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Define Email QR routes
router.post('/generate', emailController.generateEmailQR);


module.exports = router;
