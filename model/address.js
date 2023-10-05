const mongoose  = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema({
        city: { type: String, required: true },
        state: { type: String, required: true},
        country: { type: String, required: true},
        zip: { type: String, required: true},
        landmark: { type: String, required: true},
        userId : { type: String, required: true}
});

module.exports = mongoose.model('Address', addressSchema);