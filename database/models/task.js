const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 4,
    maxlength: 20
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 50
  },
  correspondingProject: {
    type: Schema.Types.ObjectId,
    ref: 'project'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Task = mongoose.model('task', taskSchema)

module.exports = Task