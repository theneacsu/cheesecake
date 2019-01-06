const express = require('express')
const ProjectsController = require('../controllers/projects')
const verifyToken = require('../middleware/auth/token')
const validateBody = require('../middleware/validation/validateBody')
const { createProjectSchema } = require('../middleware/validation/schemas/project')

const router = express.Router()

router
  .route('/all')
  .get(
    verifyToken(),
    ProjectsController.getUserProjects
  )

router
  .route('/new')
  .post(
    verifyToken(),
    validateBody(createProjectSchema),
    ProjectsController.createProject
  )

router
  .route('/project/:title')
  .get(
    verifyToken(),
    ProjectsController.getUserProjectByTitle
  )

module.exports = router