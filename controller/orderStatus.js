const Order = require('../models/order');

async function getOrderStatus(req,res) {
    try{
        const orderId = req.params.orderId;
        console.log(orderId, 'cccccccccccccc')
        const order = await Order.findById(orderId);
        console.log(order, 'oooooorrrrrdeerrr')

        if (!order) {
            return res.status(404).json({ error: 'Order not found', order });
        }

        res.status(200).json({ status: order.status});
    } catch(error) {
        console.error('Error fetching order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { getOrderStatus}