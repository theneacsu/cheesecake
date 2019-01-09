const _ = require('lodash')
const User = require('../database/models/user')
const Project = require('../database/models/project')
const Task = require('../database/models/task')
const { ObjectId } = require('mongoose').Types

async function createNewProject(req, res, next) {
  const projectData = _.pick(req.body, ['title', 'description'])
  try {
    const user = await User.findById(req.userId).populate('projects')
    const takenProjectTitle = user.projects.find(prj => prj.title === projectData.title)

    if (takenProjectTitle) {
      return res.status(403).json({ projectTitleTaken: true, projectTitle: projectData.title })
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

async function getAllUserProjects(req, res, next) {
  const { userId } = req
  try {
    const user = await User.findById(userId).populate('projects')
    if (user) {
      return res.status(200).json({ userId, email: user.email, projects: user.projects })
    }
    return res.status(403).json({ userNotFound: true, userId })
  } catch (err) {
    next(err)
  }
}

async function getProjectById(req, res, next) {
  const { projectId } = req.params
  try {
    const project = await Project.findById(projectId).populate('tasks')

    if (project) {
      return res.status(200).json({ projectFound: true, project, projectId })
    }
  
    return res.status(403).json({ projectNotFound: true, projectId })
  } catch (err) {
    next(err)
  }
}

async function editProjectById(req, res, next) {
  const { projectId } = req.params
  const { newTitle, newDescription } = req.body
  try {
    const user = await User.findById(req.userId).populate('projects')
    const project = user.projects.find(prj => prj.id = projectId)
    if (project) {
      project.title = newTitle
      if (newDescription) {
        project.description = newDescription
      }
      const savedProject = await project.save()
      return res.status(200).json({ updated: true, projectId, project })
    }
    return res.status(403).json({ projectIdNotFound: true, projectId })
  } catch (err) {
    next(err)
  }
}

async function deleteProjectById(req, res, next) {
  const { userId } = req
  const { projectId } = req.params
  try {
    const project = await Project.findById(projectId).populate('tasks')
    if (project) {
      project.tasks.forEach(async (task) => {
        const taskToRemove = await Task.findById(task.id)
        taskToRemove.remove()
      })
      project.remove()

      await User.updateOne( { _id: userId }, { $pull: { projects: projectId } }, { safe: true })
      
      return res.status(200).json({ projectDeleted: true, projectId })
    }
    return res.status(403).json({ projectDeleted: false, projectNotFoud: true, projectId })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createNewProject,
  getAllUserProjects,
  getProjectById,
  editProjectById,
  deleteProjectById
}