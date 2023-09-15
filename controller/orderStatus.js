const Order = require('../models/Order');

async function getOrderStatus(req,res) {
    try{
        const orderId = req.params.orderId;
        const order = await Order.findById("_id");

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ status: order.status});
    } catch(error) {
        console.error('Error fetching order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { getOrderStatus}