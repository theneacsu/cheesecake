function notFoundHandler(req, res, next) {
  res.status(404).json({ resourceNotFound: true })
  next()
}

module.exports = notFoundHandler