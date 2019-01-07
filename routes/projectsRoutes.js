const express = require('express')
const ProjectsController = require('../controllers/projects')
const verifyToken = require('../middleware/auth/token')
const validateBody = require('../middleware/validation/validateBody')
const { createProjectSchema, editProjectSchema } = require('../middleware/validation/schemas/project')

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
  .route('/project/:projectTitle')
  .get(
    verifyToken(),
    ProjectsController.getProjectByTitle
  )
  .delete(
    verifyToken(),
    ProjectsController.deleteProjectByTitle
  )
  .patch(
    verifyToken(),
    validateBody(editProjectSchema),
    ProjectsController.editProjectByTitle
  )

module.exports = router