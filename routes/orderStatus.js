const orderStatusController = require('../controller/orderStatus');

const express = require('express');

const router = express.Router();

router.get('/:orderId', orderStatusController.getOrderStatus);

module.exports = router;
