const joi = require('joi')

const createProjectSchema = joi.object().keys({
  title: joi.string().min(3).max(60).required(),
  description: joi.string().min(5).max(60)
})

const editProjectSchema = joi.object().keys({
  newTitle: joi.string().min(5).max(60).required(),
  newDescription: joi.string().min(5).max(60)
})

module.exports = {
  createProjectSchema,
  editProjectSchema
}