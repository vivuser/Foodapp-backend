const transporter = require('./nodemailer.js');

const mailOptions = {
    from: 'testmail@test.com',
    to: 'vivekchamyal41@gmail.com',
    subject: 'OTP for login',
    text: 'Your OTP for login is ${}'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email' , error);
    } else {
        console.log('Email sent', info.response);
    }
});