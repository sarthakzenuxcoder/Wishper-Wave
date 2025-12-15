const Room = require('../models/room');

exports.create = async (payload) => {
  const { topic, roomType, ownerId } = payload;
  const room = await Room.create({
    topic,
    roomType,
    ownerId,
    speakers: [ownerId],
  });
  return room;
};

exports.find = async (types) => {
  const rooms = await Room.find({ roomType: { $in: types } })
    .populate('speakers')
    .populate('ownerId')
    .exec();
  return rooms;
};

exports.findRoom = async (roomId) => {
  const room = await Room.findOne({ _id : roomId })
  return room;
};
