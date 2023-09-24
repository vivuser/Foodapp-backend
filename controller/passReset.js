const model = require('../model/user');
const User = model.User;
const PasswordReset = require('../model/password');
const bcrypt = require('bcrypt');

exports.getResetPassword = async (req,res,next) => {
    const resetToken = req.query.token;

    const passwordReset = await PasswordReset.findOne({
        resetToken,
        resetTokenExpiration: { $gt: Date.now() },
    });

    if (!passwordReset) {
        return res.status(404).json({ message: 'Invalid or expired token' });
    }
    res.render('reset-password');
};

    exports.postResetPassword = async(req, res, next) => {
        const resetToken = req.query.token;
        const newPassword = req.body.newPassword;

    const passwordReset = await PasswordReset.findOne({
        resetToken,
        resetTokenExpiration:{ $gt: Date.now() }
    })

    if(!passwordReset){
        return res.status(404).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findOne({ email: passwordReset.email });
    if (!user) {
        return res.status(404).json({ message: 'User not found'})
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    await passwordReset.deleteOne();

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
};