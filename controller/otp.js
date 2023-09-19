const UserModal = require('../model/user');
const UserModel = require('../model/userModel');
const sendEmail = require('../Config/emailService');

exports.sendOTP = async (req, res) => {

     try {
        const { email } = req.body;
        const otp = generateRandomOTP();
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5);


        await UserMOdel.updateOne({ email }, { otp, otpExpiration: expirationTime });
     }
}