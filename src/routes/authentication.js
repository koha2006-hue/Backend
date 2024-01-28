const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

// Define authentication routes
router.get('/', authenticationController.login);
router.post('/login', authenticationController.performLogin);

router.get('/logout', authenticationController.logout);

module.exports = router;
