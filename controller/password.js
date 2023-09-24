const PasswordReset  = require('../model/password');
const User = require('../model/userOnCheckoutPage')
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = require('../Config/nodemailer.js');

exports.postForgotPassword = async(req, res, next) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000;

        const passwordReset = new PasswordReset({
            email,
            resetToken,
            resetTokenExpiration,
        })

        await passwordReset.save()

        const resetLink = `http://localhost:8080/reset-password?token=${resetToken}`;
        const reset = `http://localhost:3000/reset-password/${resetToken}`;
        const mailOptions = {
            to: user.email,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset for your account. Click the following link to reset your password:</p><p><a href="${reset}">${reset}</a></p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};