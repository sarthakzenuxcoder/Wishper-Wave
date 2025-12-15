const roomService = require('../services/room')


exports.createRoom = async (req, res)=>{
    const {topic, roomType} = req.body

    if(!topic || !roomType) return res.status(404).json({message: 'All fiels are required'})
    try {
        const room = await roomService.create({topic, roomType, ownerId:req.user._id})
        res.json({room})
    } catch (error) {
        return res.status(500).json({message:'Could not create room'})
    }
}


exports.getAllRoom = async (req, res)=>{
    try {
        const rooms = await roomService.find(['open'])
        res.json(rooms)
    } catch (error) {
        return res.status(500).json({message:'Could not find rooms'})
    }
}


exports.getRoom = async (req, res)=>{
    try {
        const room = await roomService.findRoom(req.params.roomId)
        res.json(room)
    } catch (error) {
        return res.status(500).json({message:'Could not find room'})
    }
}