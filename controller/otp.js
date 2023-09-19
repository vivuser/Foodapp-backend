const UserModel = require('../model/user');
const sendEmail = require('../Config/emailService');

exports.sendOTP = async (req, res) => {

     try {
        const { email } = req.body;
        const otp = generateRandomOTP();
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5);


        await UserModel.updateOne({ email }, { otp, otpExpiration: expirationTime });

        await sendEmail(email, 'Your OTP', `Your OTP is ${otp}`);

        res.status(200).json({ success: true})
     } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
     }
};

exports.verifyOTP = async (req, res) => {
   try{
      const { email, otp } = req.body;

      const user = await UserModel.findOne({ email});

      if (user && user.otp === otp) {

         const currentTime = new Date();
         if (user.otpExpiration && currentTime <= user.otpExpiration) {
            
            await UserModel.updateOne({ email }, { verified: true });
            
            res.status(200).json({ success: true, message: 'OTP verified successfully.' });
         }else {
            res.status(400).json({ success:false, message: 'OTP has expired' });
         }
      }else {
         res.status(400).json({ success: false, message: 'Invalid OTP.' })
      }
   } catch(error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to verify OTP' });
   }
}