const joi = require('joi')

const createTaskSchema = joi.object().keys({
  title: joi.string().min(3).max(60).required(),
  description: joi.string().min(3).max(60),
  category: joi.string().min(4).max(60).required()
})

const editTaskSchema = joi.object().keys({
  title: joi.string().min(3).max(60),
  description: joi.string().min(3).max(60),
  category: joi.string().min(4).max(60).required()
})

module.exports = {
  createTaskSchema,
  editTaskSchema
}