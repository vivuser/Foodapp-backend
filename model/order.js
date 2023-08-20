const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true},
            quantity: { type: Number, required: true, min: 1 },
        },
    ], 
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model('Order', orderSchema);