const crypto = require('crypto');
const { hash } = require('./hash');
require('dotenv').config();
const accountSid = process.env.SMS_SID
const authToken = process.env.SMS_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken, {
    lazyLoading : true
});

exports.getOTP = async ()=>{
    const OTP = crypto.randomInt(1000, 9999)
    return OTP
}

exports.sendSMS = async (otp, phone)=>{
    return await client.messages
      .create({
        body: 'Your OTP for Apna Adda  is '+ otp,
        to: phone, 
        from: process.env.SMS_FROM_NUMBER, 
      })

      
}

exports.compareOTP = (hashedOTP, data)=>{
  const computedOtp = hash(data)
    return hashedOTP === computedOtp
}