const _ = require('lodash')
const User = require('../database/models/user')
const Project = require('../database/models/project')
const Task = require('../database/models/task')

async function getProjectTasks(req, res, next) {
  const { projectId } = req.params
  const { userId } = req
  try {
    const user = await User.findById(userId).populate('projects')
    if (user) {
      const project = user.projects.find(project => project.id === projectId)
      if (project) {
        const projectWithTasks = await Project.findById(project.id).populate('tasks')
        return res.status(200).json({ projectId, tasks: projectWithTasks.tasks})
      }
      return res.status(403).json({ projectDoesNotExist: true, projectId })
    }
    return res.status(403).json({ userNotFound: true, userId})
  } catch (err) {
    next(err)
  }
}

async function createTask(req, res, next) {
  const { userId } = req
  const { projectId } = req.params
  const taskData = _.pick(req.body, ['title', 'category'])
  try {
    const user = await User.findById(userId).populate('projects')
    if (user) {
      const project = user.projects.find(project => project.id === projectId)
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
      return res.status(403).json({ projectNotFound: true, projectId })
    }
    return res.status(403).json({ userNotFound: true, userId })
  } catch (err) {
    next(err)
  }
}

async function getTaskById(req, res, next) {
  const { userId } = req
  const { projectId, taskId } = req.params
  try {
    const user = await User.findById(userId).populate('projects')
    if (user) {
      const project = user.projects.find(project => project.id === projectId)
      if (project) {
        const projectWithTasks = await Project.findById(project.id).populate('tasks')
        const task = projectWithTasks.tasks.find(task => task.id === taskId)
        if (task) {
          return res.status(200).json({ task })
        }
        return res.status(403).json({ taskNotFound: true, taskId })
      }
      return res.status(403).json({ projectNotFound: true, projectId })
    }
    return res.status(403).json({ userNotFound: true, userId })
  } catch (err) {
    next(err)
  }
}

async function editTaskById(req, res, next) {
  const { userId } = req
  const { taskId } = req.params
  const { title, category } = req.body
  try {
    const user = await User.findById(userId)
    if (user) {
      const task = await Task.findById(taskId)
      if (task) {
        if (userId.toString() === task.createdBy.toString()) {
          const editedTask = await Task.findOneAndUpdate({ _id: taskId }, { title, category }, { new: true })
          return res.status(200).json({ taskUpdated: true, taskId, task: editedTask })
        }
      }
      return res.status(403).json({ taskNotFound: true, taskId })
    }
    return res.status(403).json({ userNotFound: true, userId })
  } catch (err) {
    next(err)
  }
}

async function deleteTaskById(req, res, next) {
  const { userId } = req
  const { taskId } = req.params

  try {
    const user = await User.findById(userId)
    if (user) {
      const task = await Task.findById(taskId)
      if (task) {
        if (userId.toString() === task.createdBy.toString()) {
          const task = await Task.findById(taskId)
          const taskRemoved = task.remove()
          await Project.updateOne( { _id: task.correspondingProject }, { $pull: { tasks: taskId } }, { safe: true })
          return res.status(200).json({ taskDeleted: true, taskId, task })
        }
      }
      return res.status(403).json({ taskNotFound: true, taskId })
    }
    return res.status(403).json({ userNotFound: true, userId })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getProjectTasks,
  createTask,
  getTaskById,
  editTaskById,
  deleteTaskById
}