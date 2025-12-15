const { verifyAccessToken } = require("../services/token")

exports.auth = async (req, res, next)=>{
    try {
        const {accessToken} = req.cookies
       const userData = await verifyAccessToken(accessToken) 
       req.user = userData
       next();
        
    } catch (error) {
        res.status(401).json({message : 'Invalid Token'})
    }
}