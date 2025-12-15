const Jimp = require('jimp');
const path = require('path');
require('dotenv').config();


 const { findUser } = require('../services/user');

exports.activateUser = async (req, res) => {

  const { fullname, username, Avatar } = req.body;

  if (!fullname || !username || !Avatar)
    return res.status(400).json({ message: 'All fields are required' });
    
  else {
    const buffer = Buffer.from(Avatar.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), 'base64');
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`

    try {
        const jimpRes = await Jimp.read(buffer);
        jimpRes.resize(150, Jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}`))
    } catch (error) {
        return res.json({message: 'Could not process the file', error : error})
    }

    const userId = req.user._id

    try {
        const user = await findUser({_id : userId})
        user.activated = true
        user.fullname = fullname
        user.username = username
        user.avatar = `${process.env.BASE_URL}/storage/${imagePath}`;
        user.save()
        res.json({user})
    } catch (error) {
        res.status(500).json({message: 'Could not find user' })
    }
  }
};
