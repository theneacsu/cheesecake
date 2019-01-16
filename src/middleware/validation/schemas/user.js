const Joi = require('joi')

const registerUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .min(5)
    .max(100)
    .required(),
  password: Joi.string()
    .min(5)
    .max(25)
    .required(),
  confirmedPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
})

const loginUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .min(5)
    .max(100)
    .required(),
  password: Joi.string()
    .min(5)
    .max(25)
    .required()
})

const editUserSchema = Joi.object().keys({
  newEmail: Joi.string()
    .email()
    .min(5)
    .max(60)
    .required(),
  oldPassword: Joi.string()
    .min(5)
    .max(25)
    .required(),
  newPassword: Joi.string()
    .min(5)
    .max(25)
    .required(),
  confirmedNewPassword: Joi.any()
    .valid(Joi.ref('newPassword'))
    .required()
})

module.exports = {
  registerUserSchema,
  loginUserSchema,
  editUserSchema
}
