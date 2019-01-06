const JWT = require('jsonwebtoken')

function generateToken(user) {
  return JWT.sign(
    { sub: user.id },
    process.env.TOKEN_SECRET,
    { expiresIn: "3d" }
  )
}

module.exports = generateToken