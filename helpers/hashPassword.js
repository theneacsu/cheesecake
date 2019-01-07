const bcrypt = require('bcryptjs')

async function hashPassword(user) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(user.password, salt)
}

module.exports = hashPassword