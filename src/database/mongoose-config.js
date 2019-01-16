const mongoose = require('mongoose')

// const user = process.env.DB_USER_TEST
// const password = process.env.DB_PASSWORD_TEST
// const uri_test = `mongodb://${user}:${password}@ds149894.mlab.com:49894/project-management`

const user = process.env.DB_USER_PROD
const password = process.env.DB_PASSWORD_PROD
const uri_prod = `mongodb://${user}:${password}@ds157834.mlab.com:57834/project-management-production`

mongoose
  .connect(
    uri_prod,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Connected to the project-management database`))
  .catch(err => console.log(err))
