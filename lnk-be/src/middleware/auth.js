const jwt = require('jsonwebtoken')
const { setResponseError } = require('../utils/response')

module.exports = (req, res, next) => {
  if (!req.headers.authorization) return  setResponseError(req, res, "Token Not Provided" , null, 401)
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return   setResponseError(req, res, "Token Tidak Valid" , null, 401)
      } else if (err.name === 'TokenExpiredError') {
        return  setResponseError(req, res, "Token Expired" , null, 401)
      } else {
        return setResponseError(req, res, err , null, 401)
      }
    }
    req.userId = decoded.data
    next()
  })
}