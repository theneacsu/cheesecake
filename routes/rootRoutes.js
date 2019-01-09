const express = require('express')
const AuthController = require('../controllers/auth')
const { loginUserSchema, registerUserSchema } = require('../middleware/validation/schemas/user')
const validateBody = require('../middleware/validation/validateBody')

const router = express.Router()

router
  .route('/login')
  .post(
    validateBody(loginUserSchema),
    AuthController.loginUser
  )

router
  .route('/register')
  .post(
    validateBody(registerUserSchema),
    AuthController.registerUser
  )

module.exports = router