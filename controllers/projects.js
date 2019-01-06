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

async function getUserProjectByTitle(req, res, next) {
  const userId = req.userId 
  const projectTitle = decodeURI(req.params.title)
  try {
    const user = await User.findById(userId).populate('projects')
    const project = user.projects.find(project => {
      console.log(projectTitle, project.title)
      return project.title === projectTitle
    })
    if (project) {
      return res.status(200).json({ projectFound: true, project })
    }
    return res.status(404).json({ projectNotFound: true })
  } catch (err) {
    next(err)
  }
}

async function createProject(req, res, next) {
  const projectData = _.pick(req.body, ['title'])
  const project = new Project(projectData)
  try {
    const user = await User.findById(req.userId)
    project.owner = user
    await project.save()
  
    user.projects.push(project)
    await user.save()
  
    return res.status(201).json({ projectCreated: true, project })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getUserProjects,
  getUserProjectByTitle,
  createProject
}