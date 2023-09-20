const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chamyal17@gmail.com',
        pass: 'dgjz cfdl vboh knjw'
    }
});

module.exports = transporter;