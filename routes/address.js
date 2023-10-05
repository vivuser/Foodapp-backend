const addressController = require('../controller/address');

const express = require('express');

const router = express.Router();


router.post('/address', addressController.saveAddress)

router.get('/address', addressController.getAddress)

exports.router = router;