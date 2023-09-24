const express = require('express');
const router = express.Router();
const passResetController  = require('../controller/passReset');

router.get('/reset-password', passResetController.getResetPassword );

router.post('/reset-password', passResetController.postResetPassword);

module.exports = router;