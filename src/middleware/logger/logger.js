const fs = require('fs')

function logger (req, res, next) {
  const { method, path, body, query } = req
  const log =
    `*************************************\n` +
    `Method: ${method}\n` +
    `Path:   ${path}\n` +
    `Body:   ${JSON.stringify(body, undefined, 2)}\n` +
    `Query:  ${JSON.stringify(query, undefined, 2)}\n` +
    `*************************************\n`
  try {
    fs.appendFile(`app-request.log`, log, () => next())
    console.log(log)
  } catch (err) {
    next(err)
  }
}

module.exports = logger
