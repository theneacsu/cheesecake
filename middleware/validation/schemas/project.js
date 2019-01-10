const joi = require('joi')

const createProjectSchema = joi.object().keys({
  title: joi.string().min(3).max(100).required(),
  description: joi.string().max(1000)
})

const editProjectSchema = joi.object().keys({
  newTitle: joi.string().min(5).max(100).required(),
  newDescription: joi.string().max(1000)
})

module.exports = {
  createProjectSchema,
  editProjectSchema
}