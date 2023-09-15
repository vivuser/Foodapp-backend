const Order = require('../model/order');

exports.createOrder = async(req,res) => {
    try{
    const order = new Order(req.body);
    await order.save()
    res.json({message: 'Order created successfully' , order })
} catch(error) {
            console.log('Error', error);
            res.status(500).json({ error: 'An error occured while placing the order'})
        }
}
