const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(user.password, salt)
  user.password = hashedPassword
  next()
})

const User = mongoose.model('user', userSchema)

module.exports = User
