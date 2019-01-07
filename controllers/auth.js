const _ = require('lodash')
const bcrypt = require('bcryptjs')
const User = require('../database/models/user')
const generateToken = require('../helpers/token')

async function loginUser(req, res, next) {
  const { email, password } = _.pick(req.body, ['email', 'password'])
  try {
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      const isPasswordMatch = await bcrypt.compare(password, foundUser.password)
      if (isPasswordMatch) {
        const token = generateToken(foundUser)
        return res.status(200).json({ loggedIn: true, user: foundUser, token })
      }
    }
    return res.status(400).json({ wrongCredentials: true })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  loginUser
}