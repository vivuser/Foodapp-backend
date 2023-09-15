const orderController = require("../controller/order");

const express = require('express');

const router = express.Router();

router.post('/submitCart', orderController.createOrder)

exports.router = router;