function allErrorsHandler(err, req, res, next) {
  console.log(err)
  if (err.status) {
    res.status(err.status).json({ error: err})
  } else {
    res.status(400).json({ error: err })
  }
  next()
}

module.exports = allErrorsHandler