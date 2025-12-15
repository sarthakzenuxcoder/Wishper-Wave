const mongoose = require('mongoose');
const { Schema } =  mongoose;

const roomSchema = new Schema({
    topic : { type: 'string', required: true},
    roomType : { type: 'string', required: true},
    ownerId : { type: Schema.Types.ObjectId, ref: 'user'},
    speakers : { type: [
        {
            type : Schema.Types.ObjectId,
            ref : 'user'
        }
    ]}
}, {timestamps : true})

module.exports = mongoose.model('room', roomSchema)