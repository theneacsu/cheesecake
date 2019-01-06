const joi = require('joi')

const createProjectSchema = joi.object().keys({
  title: joi.string().min(5).max(60).required()
})

module.exports = {
  createProjectSchema
}