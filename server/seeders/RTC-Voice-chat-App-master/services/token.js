const jwt = require('jsonwebtoken');
const refresh = require('../models/refreshToken');

exports.generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: '1h',
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: '1y',
  });
  return { accessToken, refreshToken };
};

exports.storeRefreshToken = async (token, userId) => {
  try {
    await refresh.create({ token, userId });
  } catch (error) {
    console.log(error.message);
  }
};

exports.verifyAccessToken = async (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN);
};

exports.verifyRefreshToken = async (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN);
};

exports.findRefreshToken = async (token, userId) => {
  const doc = await refresh.findOne({ userId:userId }, { token:token })
  return doc;
};

exports.updateRefreshToken = async (token, userId) => {
  await refresh.updateOne({ userId: userId }, { token: token });
};

exports.deleteRefreshToken = async (token) => {
  return await refresh.deleteOne({ token: token });
};
