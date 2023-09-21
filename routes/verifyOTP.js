const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const UserOnCOModel = require('../model/userOnCheckoutPage');

router.post('/verifyOTP', async(req, res) => {
    try{
        const { email, otp } = req.body;
        const user = await UserOnCOModel.findOne({ email });

        if (user && user.otp === otp) {
            const currentTime = new Date();
            if (user.otpExpiration && currentTime() <= user.otpExpiration) {


                console.log("checking if otp exists and matches")
                await UserOnCOModel.updateOne({ email }, { verified: true});

                res.status(200).json({ success: true, message: 'OTP verified successfully' });
            } else{
                res.status(400).json({ success: false, message: 'OTP has expired'})
            }
            }else {
                res.status(400).json({ success: false, message: 'Invalid OTP'});
            }
        }  catch(error) {
            console.error(error);
            res.status(500).json({ success:false, message: 'Failed to verify OTP'});
        }
}) ; 


exports.router = router;