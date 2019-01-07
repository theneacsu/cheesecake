const _ = require('lodash')
const User = require('../database/models/user')
const generateToken = require('../helpers/token')
const Project = require('../database/models/project.js')
const Task = require('../database/models/task.js')

async function createNewUser(req, res, next) {
  const { email, password } = _.pick(req.body, ['email', 'password'])
  try {
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(403).json({ emailTaken: true })
    }
    const user = new User({ email, password })
    const createdUser = await user.save()
    if (createdUser) {
      const token = generateToken(createdUser)
      return res.status(201).json({ created: true, user: createdUser, token })
    }
    return res.status(500).json({ userNotCreated: true })
  } catch (err) {
    next(err)
  }
}

async function deleteUserAccount(req, res, next) {
  const { email } = req.body
  try {
    const user = await User.findOne({ email }).populate('projects')
    user.projects.forEach(async (project) => {
      const projectWithTasks = await Project.findById(project.id).populate('tasks')
      projectWithTasks.tasks.forEach(async (task) => await Task.findOneAndDelete({ _id: task.id }))
      await projectWithTasks.remove()
    })
    
    const userDeleted = await user.remove()

    if (userDeleted) {
      return res.status(200).json({ accountDeleted: true, email })
    }
    return res.status(403).json({ emailNotFound: true })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createNewUser,
  deleteUserAccount
}