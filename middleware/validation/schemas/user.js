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

const editUserSchema = joi.object().keys({
  newEmail: joi.string().email().min(5).max(60).required(),
  oldPassword: joi.string().min(5).max(25).required(),
  newPassword: joi.string().min(5).max(25).required(),
  confirmedNewPassword: joi.any().valid(joi.ref('newPassword')).required()
})

module.exports = {
  registerUserSchema,
  loginUserSchema,
  editUserSchema
}