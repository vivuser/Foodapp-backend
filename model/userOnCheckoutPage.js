const mongoose = require('mongoose');
const { Schema } = mongoose;

const userOnCOSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
        required:true,
    },
    phone: { type: String, minLength: 6, required: true },
    otp: { type: String },
    verified: {
        type: Boolean,
        default: false,
    },
    otpExpiration: {
        type: Date,
    },
});

const UserOnCOMOdel = mongoose.model('UserOnCO', userOnCOSchema);

module.exports = UserOnCOMOdel;