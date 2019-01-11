const User = require('../database/models/user')
const Project = require('../database/models/project.js')
const Task = require('../database/models/task.js')
const bcrypt = require('bcryptjs')

async function getAllProjectsAndTasksByUserId (req, res, next) {
  const { userId } = req.params
  if (req.userId !== userId) {
    return res
      .status(403)
      .json({ idDoesNotMatch: true, id1: req.userId, id2: req.params.userId })
  }
  try {
    const user = await User.findById(userId).populate('projects')
    if (user) {
      const userProjects = user.projects
      const tasks = await Task.find({ createdBy: userId })
      const responseData = {
        id: userId,
        email: user.email,
        projects: userProjects,
        tasks
      }
      return res.status(200).json(responseData)
    }
    return res.status(403).json({ userNotFound: true, userId })
  } catch (err) {
    next(err)
  }
}

async function editUserAccountById (req, res, next) {
  const { userId } = req.params
  if (req.userId !== userId) {
    return res
      .status(403)
      .json({ idDoesNotMatch: true, id1: req.userId, id2: req.params.userId })
  }
  const { newEmail, oldPassword, newPassword } = req.body
  try {
    const user = await User.findById(userId)
    if (user) {
      const isOldPasswordMatch = await bcrypt.compare(
        oldPassword,
        user.password
      )
      if (isOldPasswordMatch) {
        user.email = newEmail
        user.password = newPassword
        const savedUser = await user.save()
        return res
          .status(200)
          .json({ userUpdated: true, email: savedUser.email, userId })
      } else {
        return res.status(403).json({ oldPasswordIncorrect: true, userId })
      }
    }
    return res.status(403).json({ userIdNotFound: true, userId })
  } catch (err) {
    next(err)
  }
}

async function deleteUserAccountById (req, res, next) {
  const { userId } = req.params
  if (req.userId !== userId) {
    return res
      .status(403)
      .json({ idDoesNotMatch: true, id1: req.userId, id2: req.params.userId })
  }
  try {
    const user = await User.findById(userId).populate('projects')
    if (user) {
      user.projects.forEach(async project => {
        const projectWithTasks = await Project.findById(project.id).populate(
          'tasks'
        )
        projectWithTasks.tasks.forEach(async task =>
          Task.findOneAndDelete({ _id: task.id })
        )
        await projectWithTasks.remove()
      })

      const userDeleted = await user.remove()

      if (userDeleted) {
        return res
          .status(200)
          .json({ accountDeleted: true, userId, email: userDeleted.email })
      }
    }
    return res.status(403).json({ userNotFound: true, userId })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAllProjectsAndTasksByUserId,
  editUserAccountById,
  deleteUserAccountById
}
