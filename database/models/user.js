const mongoose = require('mongoose')
const Project = require('./project')
const Task = require('./task')
const hashPassword = require('../../helpers/hashPassword')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 60,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 60,
  },
  projects: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'project'
      }
    ]
  }
})

userSchema.pre('save', async function(next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }
  user.password = await hashPassword(user)
  next()
})

const User = mongoose.model('user', userSchema)

module.exports = User
