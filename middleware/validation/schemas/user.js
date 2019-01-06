const joi = require('joi')

const registerUserSchema = joi.object().keys({
  email: joi.string().email().min(5).max(60).required(),
  password: joi.string().min(5).max(25).required(),
  confirmedPassword: joi.any().valid(joi.ref('password')).required()
})

const loginUserSchema = joi.object().keys({
  email: joi.string().email().min(5).max(60).required(),
  password: joi.string().min(5).max(25).required()
})

module.exports = {
  registerUserSchema,
  loginUserSchema
}