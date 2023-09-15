const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');

router.get('/order-status/orderId', orderController.getOrderStatus);

module.exports = router;