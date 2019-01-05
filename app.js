const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ works: true })
})

const port = process.env.PORT || 1992

app.listen(port, () => console.log(`Server is up and running on port ${port}`))