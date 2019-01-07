const express = require('express')
const AuthController = require('../controllers/auth')
const { loginUserSchema } = require('../middleware/validation/schemas/user')
const validateBody = require('../middleware/validation/validateBody')

const router = express.Router()

router
  .route('/login')
  .post(
    validateBody(loginUserSchema),
    AuthController.loginUser
  )

module.exports = router