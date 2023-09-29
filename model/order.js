const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
    orderData:{
        type:Object
    }
}); 

module.exports = mongoose.model('Order', orderSchema);

