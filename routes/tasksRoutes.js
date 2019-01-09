const express = require('express')
const TasksController = require('../controllers/tasks')
const verifyToken = require('../middleware/auth/token')
const validateBody = require('../middleware/validation/validateBody')
const { editTaskSchema, createTaskSchema } = require('../middleware/validation/schemas/task')

const router = express.Router()

router
  .route('/:projectId/tasks/all')
  .get(
    verifyToken(),
    TasksController.getProjectTasks
  )

router
  .route('/:projectId/tasks/new')
  .post(
    verifyToken(),
    validateBody(createTaskSchema),
    TasksController.createTask
  )

router
  .route('/:projectId/tasks/:taskId')
  .get(
    verifyToken(),
    TasksController.getTaskById
  )
  .patch(
    verifyToken(),
    validateBody(editTaskSchema),
    TasksController.editTaskById
  )
  .delete(
    verifyToken(),
    TasksController.deleteTaskById
  )

module.exports = router