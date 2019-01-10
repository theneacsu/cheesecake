const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String 
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
