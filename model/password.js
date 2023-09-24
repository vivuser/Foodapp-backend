const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    resetToken: String,
    resetTokenExpiration: Date,
});

module.exports = mongoose.model('Password', passSchema);