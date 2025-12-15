const otpServices = require('../services/otp');
const userService = require('../services/user');
const tokenService = require('../services/token');

const { hash } = require('../services/hash');

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    res.status(404).json({ message: 'Number is required' });
  }

  const OTP = await otpServices.getOTP();
  const ttl = 1000 * 60 * 2;
  const expireTime = Date.now() + ttl;
  const data = `${OTP}.${phone}.${expireTime}`;
  const hashedOTP = hash(data);

  try {
    await otpServices.sendSMS(OTP, phone);
    res.json({ hashforToken: `${hashedOTP}.${expireTime}`, phone });
  } catch (error) {
    res.status(500).json({ error: 'Could not send the OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp, hash } = req.body;
  if (!phone || !otp || !hash)
    res.status(400).json({ error: 'All fields are required' });

  const [hashedOTP, expireTime] = hash.split('.');
  if (Date.now() > +expireTime)
    return res.status(400).json({ error: 'OTP has expired' });

  const data = `${otp}.${phone}.${expireTime}`;

  const isValid = otpServices.compareOTP(hashedOTP, data);

  let user;
  if (!isValid) {
    res.status(401).json({ error: 'Invalid OTP' });
  } else {
    try {
      user = await userService.findUser({ phone: phone });
      if (!user) {
        user = await userService.createUser({ phone: phone });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Could not create the user' });
    }

    const { accessToken, refreshToken } = tokenService.generateToken({
      _id: user._id,
      activated: false,
    });

    tokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.json({ user });
  }
};

exports.refresh = async (req, res) => {
  const { refreshToken: Cookietoken } = req.cookies;
  if (!Cookietoken) return res.json({ user: null });

  let userData;
  try {
    userData = await tokenService.verifyRefreshToken(Cookietoken);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  try {
    await tokenService.findRefreshToken(Cookietoken, userData._id);
  } catch (error) {
    return res.status(500).json({
      message: 'Refresh token could not be found in the database',
      error: error,
    });
  }

  const user = await userService.findUser({ _id: userData._id });
  if (!user) {
    return res.status(404).json({ message: 'No user found' });
  }

  const { accessToken, refreshToken } = tokenService.generateToken({
    _id: user._id,
  });

  try {
    await tokenService.updateRefreshToken(refreshToken, userData._id);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Refresh token could not be updated in the database' });
  }

  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.json({ user });
};

exports.Logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  await tokenService.deleteRefreshToken(refreshToken);
  // try {
  // } catch (error) {
  //   return res.status(500).json({ message: 'Internal Server Error' });
  // }

  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');
  res.json({ user: null });
};
