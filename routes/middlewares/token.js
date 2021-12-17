const jwt = require('jwt-simple');
const config = require('../../config.js');
const moment = require('moment');

const checkToken = (req, res, next) => {

    console.log(req.headers.authorization)

    if (!req.headers.authorization) {
        return res.status(403).json({
            message: "No authentication."
        })
    }

    const userToken = req.headers.authorization.split(" ")[1]
    let payload = {}
    try {
        payload = jwt.decode(userToken, config.JWT_SECRET_KEY)
    } catch (error) {
        return res.status(403).json({
            message: "Incorrect Token."
        })
    }

    if (payload.expiredAt < moment().unix()) {
        return res.status(401).json({
            message: "Token has expirated."
        })
    }

    req.userId = payload.userId
    req.roleId = payload.roleId
    req.company = payload.company
    

    next();
}

module.exports = {
    checkToken: checkToken
}