const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderListSchema = new mongoose.Schema({
    orderListData: Array
})

module.exports = mongoose.model('OrderList', orderListSchema)