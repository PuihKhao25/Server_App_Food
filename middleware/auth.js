const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>{
    const authHeader = req.header('Authorization')
    
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if(!token) return res.sendStatus(401)
    try {
        const user = jwt.verify(token,process.env.ACCESS_TOKEN )
        req.user = user;
        next()
    } catch (error) {
        return res.json({ success: false,  message: 'Token Fail' })
        
    }
}

const requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
  //jwt.decode()
};
module.exports = verifyToken