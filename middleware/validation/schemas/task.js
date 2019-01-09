const joi = require('joi')

const createTaskSchema = joi.object().keys({
  title: joi.string().min(3).max(60).required(),
  category: joi.string().min(4).max(60).required()
})

const editTaskSchema = joi.object().keys({
  title: joi.string().min(3).max(60).required(),
  category: joi.string().min(4).max(60).required()
})

module.exports = {
  createTaskSchema,
  editTaskSchema
}