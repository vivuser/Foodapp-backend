const Order = require('../model/order');

async function getOrderStatus(req,res) {
    try{
        const orderId = req.params;
        console.log(orderId.orderId, 'cccccccccccccc')
        console.log(Order)
        const order = await Order.findById(orderId.orderId);
        console.log(order, 'oooooorrrrrdeerrr')

        if (!order) {
            return res.status(404).json({ error: 'Order not found', order });
        }

        res.status(200).json({ order: order , status: 'order placed successfully'});
    } catch(error) {
        console.error('Error fetching order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { getOrderStatus}