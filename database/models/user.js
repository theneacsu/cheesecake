const mongoose = require('mongoose')

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
    maxlength: 25,
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

const User = mongoose.model(userSchema)

module.exports = User
