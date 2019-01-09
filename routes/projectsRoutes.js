const express = require('express')
const ProjectsController = require('../controllers/projects')
const verifyToken = require('../middleware/auth/token')
const validateBody = require('../middleware/validation/validateBody')
const { createProjectSchema, editProjectSchema } = require('../middleware/validation/schemas/project')

const router = express.Router()

router
  .route('/new')
  .post(
    verifyToken(),
    validateBody(createProjectSchema),
    ProjectsController.createNewProject
  )

router
  .route('/all')
  .get(
    verifyToken(),
    ProjectsController.getAllUserProjects
  )

router
  .route('/:projectId')
  .get(
    verifyToken(),
    ProjectsController.getProjectById
  )
  .patch(
    verifyToken(),
    validateBody(editProjectSchema),
    ProjectsController.editProjectById
  )
  .delete(
    verifyToken(),
    ProjectsController.deleteProjectById
  )
  
module.exports = router