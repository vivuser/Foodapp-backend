const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
    orderData:Object
}); 

module.exports = mongoose.model('Order', orderSchema);

