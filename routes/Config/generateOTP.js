function generateRandomOTP(length) {
    const characters = '0123456789'; // The set of characters to use for the OTP
    let otp = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters.charAt(randomIndex);
    }
    
    return otp;
  }
  