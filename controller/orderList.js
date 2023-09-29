const Order = require('../model/order');
// const OrderList = require('../model/orderList');

async function getOrderList(req, res) {
    try {
        const userId = req.body

        const orderList =   await Order.findByuserId({userId})

        res.status(200).json({orderList})
    }
    catch (error){
        console.error('Error fetching orders history')
    }
}

exports.module = {getOrderList}