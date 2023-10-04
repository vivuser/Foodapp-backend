const Order = require('../model/order');
// const OrderList = require('../model/orderList');

exports.getOrderList = async function getOrderList(req, res) {
    try {
        const userId = req.body?.userId

        console.log(userId)
        const orderList =   await Order.find({ 'orderData.cartInfo.orderData.userId' : userId});
        console.log(orderList)

        res.status(200).json({orderList})
    }
    catch (error){
        console.error(error, 'Error fetching orders history')
    }
}
