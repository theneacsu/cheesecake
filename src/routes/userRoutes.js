const express = require('express')
const UserController = require('../controllers/users')
const { editUserSchema } = require('../middleware/validation/schemas/user')
const validateBody = require('../middleware/validation/validateBody')
const verifyToken = require('../middleware/auth/token')

const router = express.Router()

router
  .route('/:userId')
  .get(verifyToken(), UserController.getAllProjectsAndTasksByUserId)
  .patch(
    verifyToken(),
    validateBody(editUserSchema),
    UserController.editUserAccountById
  )
  .delete(verifyToken(), UserController.deleteUserAccountById)

module.exports = router
