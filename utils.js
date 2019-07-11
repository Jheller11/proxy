const axios = require('axios')
const Request = require('./models/Request')

const utils = {
  // receives full compiled url and res object from route/sends response
  // or passes any error to error handler
  processNewRequest: (url, res, next) => {
    axios
      .get(url)
      .then(response => {
        res.send(response.data)
      })
      .catch(err => next(err))
  },
  checkPassword: (req, res, next) => {
    if (req.body.password === process.env.ADMIN_PASSCODE) {
      next()
    } else {
      res.redirect('/admin/denied')
    }
  },
  saveRequest: (req, res, next) => {
    // body => req.body
    // method => req.originalMethod
    // path => req.originalUrl
    // application => req.baseUrl - leading /
    console.log(req.baseUrl)
    Request.create({
      body: req.body,
      method: req.originalMethod,
      path: req.originalUrl,
      application: req.baseUrl.slice(1)
    })
    next()
  },
  // for projects that don't require 3rd party data
  // only track page views
  saveHit: (req, res, next) => {
    Request.create({
      body: {},
      method: req.originalMethod,
      path: req.originalUrl,
      application: req.route.path.slice(1)
    })
    next()
  }
}

module.exports = utils
