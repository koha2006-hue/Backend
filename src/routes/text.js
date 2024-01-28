const express = require('express');
const router = express.Router();
const textController = require('../controllers/textController');

// Define Link QR routes
router.get('/generate', textController.showTextQRGeneration);
router.post('/generate', textController.generateTextQR);

router.get('/edit/:id', textController.editText);
router.post('/edit/:id', textController.saveTextChanges);

module.exports = router;
