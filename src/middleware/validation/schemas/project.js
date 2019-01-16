const Joi = require('joi')

const createProjectSchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(250)
    .required(),
  description: Joi.string()
    .allow('')
    .optional()
    .max(5000)
})

const editProjectSchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(250)
    .required(),
  description: Joi.string()
    .allow('')
    .optional()
    .max(5000)
})

module.exports = {
  createProjectSchema,
  editProjectSchema
}
