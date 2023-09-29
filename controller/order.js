const Order = require('../model/order');

function generateOrderNumber() {
    const timeStamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000);
    return `ORD-${timeStamp}-${randomPart}`;
}


exports.createOrder = async(req,res) => {
    try{
    const orderNumber = generateOrderNumber();
        console.log({ ...req.body,
            orderNumber,
        } )
    // const order = new Order({
    //     orderData: { ...req.body,
    //         orderNumber,
    //     } 
    // });
    let order = await Order.create({
        orderData: { ...req.body,
            orderNumber,
        } 
    })
    res.json({message: 'Order created successfully' , order })
} catch(error) {
            console.log('Error', error);
            res.status(500).json({ error: 'An error occured while placing the order'})
        }
}
