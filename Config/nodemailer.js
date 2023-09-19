const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vivekchamyal41@gmail.com',
        pass: '123456'
    }
});

module.exports = transporter;