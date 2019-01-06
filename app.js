const express = require('express')
require('dotenv').config()
require('./database/mongoose-config')
const loggerMiddleware = require('./middleware/logger/logger')
const rootRoutes = require('./routes/rootRoutes')
const projectsRoutes = require('./routes/projectsRoutes')
const tasksRoutes = require('./routes/tasksRoutes')
const notFoundMiddleware = require('./middleware/error/notFound')
const catchAllErrorsMiddleware = require('./middleware/error/catchAllErrors')

const app = express()

app.use(express.json())
app.use(loggerMiddleware)

app.get('/', (req, res) => {
  res.status(200).json({ works: true })
})

app.use('/', rootRoutes)
app.use('/projects', projectsRoutes)
app.use('/projects/project', tasksRoutes)

app.use(notFoundMiddleware)
app.use(catchAllErrorsMiddleware)

const port = process.env.PORT || 1992

app.listen(port, () => console.log(`Server is up and running on port ${port}`))