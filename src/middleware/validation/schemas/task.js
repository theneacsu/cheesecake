const Joi = require('joi')

const createTaskSchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(250)
    .required(),
  description: Joi.string()
    .allow('')
    .optional()
    .max(5000),
  category: Joi.string()
    .min(4)
    .max(60)
    .required()
})

const editTaskSchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(250),
  description: Joi.string()
    .allow('')
    .optional()
    .max(5000),
  category: Joi.string()
    .min(4)
    .max(60)
    .required()
})

module.exports = {
  createTaskSchema,
  editTaskSchema
}
