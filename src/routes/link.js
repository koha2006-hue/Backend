const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

// Define Link QR routes
router.get('/generate', linkController.showLinkQRGeneration);
router.post('/generate', linkController.generateLinkQR);
router.get('/scan/:id', linkController.scanLinkQR);

router.get('/edit/:id', linkController.editLink);
router.post('/edit/:id', linkController.saveLinkChanges);


module.exports = router;
