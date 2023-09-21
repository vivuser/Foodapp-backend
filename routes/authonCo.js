const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const UserOnCOModel = require('../model/userOnCheckoutPage');

router.post('/signUpOnCheckout', async (req, res) => {
    try{
        const { name, email, phone } = req.body;

        const newUser = new UserOnCOModel({ name, email, phone});

        await newUser.save();

        generatedOTP = await userController.sendOTP(email);

        newUser.otp = generatedOTP;

        await newUser.save();
        console.log(newUser)

        res.status(201).json({ success: true, message: 'User registered, and OTP sent' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to register user. '})        
    }
});

router.post('/loginOnCheckout', async(req, res) => {
    try{
        const { email } = req.body;

        const otpSent = await userController.sendOTP(email);

       if (otpSent) {
        res.status(200).json({ success: true, message:'OTP sent for login'});
       } else {
        res.status(500).json({ success: false, message:'Failed to send OTP for login'});
       }
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send OTP for login.'})
    }
});


exports.router = router;

