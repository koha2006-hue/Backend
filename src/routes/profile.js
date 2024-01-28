const express = require('express');
const router = express.Router();
const qrListController = require('../controllers/qrListController');
const profileController = require('../controllers/profileController');


router.post('/', profileController.showProfile)
router.get('/edit', profileController.editProfile);
router.post('/edit', profileController.saveProfileChanges);
router.get('/back/:id', profileController.backToList);
router.get('/delete/:id', profileController.deleteQRCode);

module.exports = router;
