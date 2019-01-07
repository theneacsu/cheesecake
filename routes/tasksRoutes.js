const express = require('express')
const TasksController = require('../controllers/tasks')
const verifyToken = require('../middleware/auth/token')
const validateBody = require('../middleware/validation/validateBody')
const { editTaskSchema } = require('../middleware/validation/schemas/task')

const router = express.Router()

router
  .route('/:projectTitle/tasks/all')
  .get(
    verifyToken(),
    TasksController.getProjectTasks
  )

router
  .route('/:projectTitle/tasks/new')
  .post(
    verifyToken(),
    TasksController.createTask
  )

router
  .route('/:projectTitle/tasks/task/:taskId')
  .get(
    verifyToken(),
    TasksController.getTaskById
  )
  .delete(
    verifyToken(),
    TasksController.deleteTaskById
  )
  .patch(
    verifyToken(),
    validateBody(editTaskSchema),
    TasksController.editTaskById
  )

module.exports = router