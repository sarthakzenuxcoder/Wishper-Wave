const crypto = require('crypto');
require('dotenv').config();

exports.hash = (data)=>{
    const hashedOTP = crypto.createHmac('sha256', process.env.SECRET).update(data).digest('hex');
    return hashedOTP
}