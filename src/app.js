const express = require('express')
const path = require('path')
require('dotenv').config()
require('./database/mongoose-config')

const loggerMiddleware = require('./middleware/logger/logger')
const rootRoutes = require('./routes/rootRoutes')
const usersRoutes = require('./routes/userRoutes')
const projectsRoutes = require('./routes/projectsRoutes')
const tasksRoutes = require('./routes/tasksRoutes')
const notFoundMiddleware = require('./middleware/error/notFound')
const catchAllErrorsMiddleware = require('./middleware/error/catchAllErrors')

const app = express()

app.use(express.json())
app.use(loggerMiddleware)

app.use('/', rootRoutes)
app.use('/users', usersRoutes)
app.use('/projects', projectsRoutes)
app.use('/projects', tasksRoutes)

if (process.env.NODE_ENV = 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(notFoundMiddleware)
app.use(catchAllErrorsMiddleware)

const port = process.env.PORT || 1992

app.listen(port, () => console.log(`Server is up and running on port ${port}`))
