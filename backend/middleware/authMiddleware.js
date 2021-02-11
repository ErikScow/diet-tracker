const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

const authenticate = (req, res, next) => {
    const id = parseInt(req.params.id)

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        if (token){
            jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
                if (err){
                    console.log(err)
                    res.status(401).json({ message: 'invalid token' })
                } else if (decodedToken.userId === id){
                    req.decodedToken = decodedToken
                    next()
                } else {
                    res.status(403).json({ message: 'you dont have access to this'})
                } 
            })
        } else {
            res.status(401).json({ message: 'no token included in authorization header' })
        }
    } else {
        res.status(401).json({ message: 'no authorization header included'})
    }
   
}

module.exports = {
    authenticate,
}