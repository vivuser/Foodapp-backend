const Order = require('../model/order');
// const OrderList = require('../model/orderList');

exports.getOrderList = async function getOrderList(req, res) {
    try {
        const userId = req.body.userId

        const orderList =   await Order.find({ 'orderData.cartInfo.orderData.userId' : userId});

        res.status(200).json({orderList})
    }
    catch (error){
        console.error('Error fetching orders history')
    }
}
