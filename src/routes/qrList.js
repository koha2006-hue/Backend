const express = require('express');
const router = express.Router();
const qrListController = require('../controllers/qrListController');
const {authenticateUser} = require('../controllers/authenticationController');

// Apply the authenticateUser middleware globally to ensure currentAccount is available


// Define routes
router.post('/list', qrListController.listQRCodes);
router.get('/list', qrListController.showList);
module.exports = router;
