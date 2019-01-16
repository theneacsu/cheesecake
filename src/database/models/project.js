const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  },
  description: {
    type: String,
    maxlength: 5000
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'task'
    }
  ]
})

const Project = mongoose.model('project', projectSchema)

module.exports = Project
