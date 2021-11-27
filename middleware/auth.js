const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>{
    const authHeader = req.header('Authorization')
    
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if(!token) return res.sendStatus(401)
    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN )
        console.log(decoded)
        next()
    } catch (error) {
        return res.json({ success: false,  message: 'Token Fail' })
        
    }
}

module.exports = verifyToken