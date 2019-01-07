const joi = require('joi')

const editTaskSchema = joi.object().keys({
  title: joi.string().min(5).max(60).required(),
  category: joi.string().min(5).max(60).required()
})

module.exports = {
  editTaskSchema
}