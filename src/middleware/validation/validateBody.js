const Joi = require('joi')

function validateBody (schema) {
  return function (req, res, next) {
    const result = Joi.validate(req.body, schema)
    if (result.error) {
      return res.status(400).json({ error: result.error })
    }
    next()
  }
}

module.exports = validateBody
