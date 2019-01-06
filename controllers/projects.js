const _ = require('lodash')
const User = require('../database/models/user')
const Project = require('../database/models/project')

async function getUserProjects(req, res, next) {
  const id = req.userId
  try {
    const user = await User.findById(id).populate('projects')
    return res.status(200).json({ id, projects: user.projects })
  } catch (err) {
    next(err)
  }
}

async function getProjectByTitle(req, res, next) {
  const userId = req.userId 
  const projectTitle = decodeURI(req.params.projectTitle)
  try {
    const user = await User.findById(userId).populate('projects')
    if (user) {
      const project = user.projects.find(project => project.title === projectTitle)
      if (project) {
        const projectWithTasks = await Project.findById(project.id).populate('tasks')
        return res.status(200).json({ projectFound: true, project: projectWithTasks })
      }
      return res.status(404).json({ projectNotFound: true })
    }
  } catch (err) {
    next(err)
  }
}

async function createProject(req, res, next) {
  const projectData = _.pick(req.body, ['title'])
  
  try {
    const user = await User.findById(req.userId).populate('projects')
    const takenProjectTitle = user.projects.find(prj => prj.title === projectData.title)

    if (takenProjectTitle) {
      return res.status(403).json({ projectTitleTaken: true })
    }

    const project = new Project(projectData)
    project.owner = user
    
    const savedProject = await project.save()

    user.projects.push(savedProject)
    const savedUser = await user.save()

    const displayedProject = await Project.findById(savedProject.id).populate('tasks')

    return res.status(201).json({ projectCreated: true, project: displayedProject })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getUserProjects,
  getProjectByTitle,
  createProject
}