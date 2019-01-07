const express = require('express')
const UserController = require('../controllers/users')
const { loginUserSchema, registerUserSchema, deleteUserSchema } = require('../middleware/validation/schemas/user')
const validateBody = require('../middleware/validation/validateBody')
const verifyToken = require('../middleware/auth/token')

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

router
  .route('/deleteAccount')
  .delete(
    verifyToken(),
    validateBody(deleteUserSchema),
    UserController.deleteUserAccount
  )

module.exports = router