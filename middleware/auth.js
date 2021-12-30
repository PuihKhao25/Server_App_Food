const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>{
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.sendStatus(401)
    try {
        const user = jwt.verify(token,process.env.ACCESS_TOKEN )
        req.user = user;
        next()
    } catch (error) {
        return res.json({ success: false,  message: 'Token Fail' })
        
    }
}

module.exports = verifyToken