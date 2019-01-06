const express = require('express')
const UserController = require('../controllers/users')
const { loginUserSchema, registerUserSchema, validateBody } = require('../middleware/validation/user')

const router = express.Router()

router
  .route('/register')
  .post(
    validateBody(registerUserSchema),
    UserController.createNewUser
  )

router
  .route('/login')
  .post(
    validateBody(loginUserSchema),
    UserController.loginUser
  )

module.exports = router