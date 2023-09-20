const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const UserOnCOModel = require('../model/userOnCheckoutPage');

router.post('/signUpOnCheckout', async (req, res) => {
    try{
        const { name, email, phone } = req.body;

        const newUser = new UserOnCOModel({ name, email, phone});

        await newUser.save();

        await userController.sendOTP(email);

        res.status(201).json({ success: true, message: 'User registered, and OTP sent' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to register user. '})        
    }
});

router.post('/loginOnCheckout', async(req, res) => {
    try{
        const { email } = req.body;

        await userController.sendOTP(email);

        res.status(200).json({ success: true, message: 'OTP sent for login' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send OTP for login.'})
    }
});

module.exports = router;

