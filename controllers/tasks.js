const _ = require('lodash')
const User = require('../database/models/user')
const Project = require('../database/models/project')
const Task = require('../database/models/task')

async function getProjectTasks(req, res, next) {
  const projectTitle = decodeURI(req.params.projectTitle)
  try {
    const user = await User.findById(req.userId).populate('projects')
    if (user) {
      const project = user.projects.find(project => project.title === projectTitle)
      if (project) {
        const projectWithTasks = await Project.findById(project.id).populate('tasks')
        return res.status(200).json({ project: project.title, tasks: projectWithTasks.tasks})
      }
      return res.status(403).json({ projectDoesNotExist: true })
    }
  } catch (err) {
    next(err)
  }
}

async function createTask(req, res, next) {
  const taskData = _.pick(req.body, ['title', 'category'])
  const projectTitle = decodeURI(req.params.projectTitle)
  try {
    const user = await User.findById(req.userId).populate('projects')
    if (user) {
      const project = user.projects.find(project => project.title === projectTitle)
      if (project) {
        const task = new Task(taskData)
        task.correspondingProject = project
        task.createdBy = user
        const savedTask = await task.save()

        project.tasks.push(savedTask)
        const savedProject = await project.save()

        const displayTask = await Task.findById(savedTask.id)

        return res.status(201).json({ taskCreated: true, task: displayTask })
      }
      return res.status(403).json({ projectDoesNotExist: true })
    }
  } catch (err) {
    next(err)
  }
}

async function getTaskById(req, res, next) {
  const { taskId } = req.params
  const projectTitle = decodeURI(req.params.projectTitle)
  try {
    const user = await User.findById(req.userId).populate('projects')
    if (user) {
      const project = user.projects.find(project => project.title === projectTitle)
      if (project) {
        const projectWithTasks = await Project.findById(project.id).populate('tasks')
        const task = projectWithTasks.tasks.find(task => task.id === taskId)
        if (task) {
          return res.status(200).json({ project: project.title, taskId: task.id, task })
        }
        return res.status(403).json({ taskNotFound: true })
      }
    }
  } catch (err) {
    next(err)
  }
}

async function deleteTaskById(req, res, next) {
  const task = await Task.findOneAndDelete(req.params.taskId)
  if (task) {
    return res.status(200).json({ taskDeleted: true, taskId: req.params.taskId })
  }
  return res.status(403).json({ invalidTaskId: true })
}

async function editTaskById(req, res, next) {
  const { title, category } = req.body
  const task = await Task.findOneAndUpdate({ _id: req.params.taskId }, { title, category }, { new: true })
  if (task) {
    return res.status(200).json({ taskUpdated: true, taskId: task.id })
  }
  return res.status(403).json({ invalidTaskId: true })
}

module.exports = {
  getProjectTasks,
  createTask,
  getTaskById,
  deleteTaskById,
  editTaskById
}