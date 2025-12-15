const express = require('express')
const router = express.Router()
const {sendOTP, verifyOtp, refresh, Logout} = require('./controllers/auth')
const { activateUser } = require('./controllers/activate')
const { auth } = require('./middleware/auth')
const { createRoom, getRoom, getAllRoom } = require('./controllers/room')

router
.post('/api/send-otp', sendOTP)
.post('/api/verify-otp', verifyOtp)
.post('/api/activate', auth, activateUser)
.get('/api/refresh', refresh)
.post('/api/logout', auth, Logout)
.post('/api/addRoom', auth, createRoom)
.get('/api/getRoom', auth, getAllRoom)
.get('/api/rooms/:roomId', auth, getRoom)

module.exports = router;