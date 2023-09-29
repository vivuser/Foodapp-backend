const  { getOrderList } = require('../controller/orderList')

const express = require('express')

const router = express.Router()

router.get('/account', getOrderList )

exports.router = router;