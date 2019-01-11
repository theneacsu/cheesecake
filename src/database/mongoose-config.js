const mongoose = require('mongoose')

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const uri = `mongodb://${user}:${password}@ds149894.mlab.com:49894/project-management`

mongoose
  .connect(
    uri,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Connected to the project-management database`))
  .catch(err => console.log(err))
