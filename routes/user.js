const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/verify-otp', userController.verifyOTP);

module.exports = router;