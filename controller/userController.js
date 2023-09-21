const UserOnCOModel = require('../model/userOnCheckoutPage'); // Change the variable name

function generateRandomOTP(length) {
   const characters = '0123456789'; // The set of characters to use for the OTP
   let otp = '';
   
   for (let i = 0; i < length; i++) {
     const randomIndex = Math.floor(Math.random() * characters.length);
     otp += characters.charAt(randomIndex);
   }
   
   return otp;
 }

 // Generate a 6-digit OTP
 const otp = generateRandomOTP(6);
 console.log(otp);

exports.sendOTP = async (email) => {
     try {
        const otp = generateRandomOTP(6);
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5000);

        await UserOnCOModel.updateOne({ email }, { otp:otp , otpExpiration: expirationTime });

      const transporter = require('../Config/nodemailer.js');

      const mailOptions = {
         from : 'test@test.com',
         to: email,
         subject: 'OTP for login',
         text: `Your OTP for login is ${otp}`
      }

      transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
            console.error('Error sending email', error);
         } else {
            console.log('Email sent', otp,  info.response);
         }
      });

      return otp; 
   } catch (error) {
      console.error(error);
      return false;
   }
};

exports.verifyOTP = async (req, res) => {
   try {
      const { email, otp } = req.body;

      const user = await UserOnCOModel.findOne({ email });

      if (user && user.otp === otp) {

         const currentTime = new Date();
         if (user.otpExpiration && currentTime <= user.otpExpiration) {
            
            await UserOnCOModel.updateOne({ email }, { verified: true });
            
            res.status(200).json({ success: true, message: 'OTP verified successfully.' });
         } else {
            res.status(400).json({ success: false, message: 'OTP has expired' });
         }
      } else {
         res.status(400).json({ success: false, message: 'Invalid OTP.' })
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to verify OTP' });
   }
}
