const mongoose = require('mongoose')

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const uri = `mongodb://${user}:${password}@ds149344.mlab.com:49344/project-management`

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log(`Connected to the project-management database`))
  .catch(err => console.log(err))
