const  getOrderController = require('../controller/orderList')

const express = require('express')

const router = express.Router()

router.get('/account', getOrderController.getOrderList )

module.exports = router;