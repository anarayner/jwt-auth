const jwt = require('jsonwebtoken');
const {secret} = require("./config")

module.exports = function (req, res, next){
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader){
            return  next(res.status(401).json({message: `Authorization error`}))
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken){
            return  next(res.status(401).json({message: `Authorization error`}))
        }

        const userData = validateAccessToken(accessToken)
        if(!userData){
            return  next(res.status(401).json({message: `Authorization error`}))
        }
        req.user = userData
        next()
    } catch (e) {
        throw res.status(401).json({message: `Authorization error`})
    }
}

const validateAccessToken = (token) =>{
    try {
        return jwt.verify(token, secret)
    } catch (e) {
        return null
    }
}