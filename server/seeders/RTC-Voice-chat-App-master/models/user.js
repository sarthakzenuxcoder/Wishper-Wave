const mongoose = require('mongoose');
const { Schema } =  mongoose;

const userSchema = new Schema({
    fullname : { type: 'string'},
    username : { type: 'string'},
    activated : { type: 'boolean', default: false},
    phone : { type: 'string', required: true},
    avatar : { type: 'string'},

}, {timestamps : true})

module.exports = mongoose.model('user', userSchema)