const mongoose = require('mongoose');
const { Schema } = mongoose;

count = 0
const orderSchema = new mongoose.Schema({
    orderData:Object,
    orderId: String
}); 

module.exports = mongoose.model('Order', orderSchema);