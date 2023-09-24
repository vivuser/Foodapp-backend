const express = require('express');
const router = express.Router();
const passController = require('../controller/password');

router.post('/forgot-password', passController.postForgotPassword);

module.exports = router;