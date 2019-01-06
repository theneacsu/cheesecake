const JWT = require('jsonwebtoken')

function verifyToken() {
  return function(req, res, next) {
    const token = req.headers.auth
    const result = JWT.verify(token, process.env.TOKEN_SECRET)
    if (result.sub) {
      req.userId = result.sub
    }
    next()
  }
}

module.exports = verifyToken