const _ = require('lodash')
const bcrypt = require('bcryptjs')
const User = require('../database/models/user')
const generateToken = require('../helpers/token')

async function loginUser(req, res, next) {
  const { email, password } = req.body
  try {
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      const isPasswordMatch = await bcrypt.compare(password, foundUser.password)
      if (isPasswordMatch) {
        const token = generateToken(foundUser)
        return res.status(200).json({
          userLoggedIn: true, 
          user: {
            id: foundUser.id,
            email
          }, 
          token 
        })
      }
    }
    return res.status(403).json({ wrongCredentials: true })
  } catch (err) {
    next(err)
  }
}

async function registerUser(req, res, next) {
  const { email, password } = _.pick(req.body, ['email', 'password'])
  try {
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(403).json({ emailTaken: true })
    }
    const user = new User({ email, password })
    const createdUser = await user.save()
    if (createdUser) {
      const token = generateToken(createdUser)
      return res.status(201).json({
        userCreated: true, 
        user: {
          id: createdUser.id,
          email
        }, 
        token 
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  loginUser,
  registerUser
}