const user = require('../models/user');

exports.findUser = async (filter)=>{
    const User = await user.findOne(filter);
    return User;
}

exports.createUser = async (data)=>{
    const User = await user.create(data)
    return User;
}