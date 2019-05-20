const axios = require('axios')

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
    if (req.body.password) {
      // check password
      next()
    } else {
      res.render('home', {
        message:
          'Access restricted: A password is required to view the page you requested.'
      })
    }
  }
}

module.exports = utils
