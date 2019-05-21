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
    if (req.body.password === process.env.ADMIN_PASSCODE) {
      next()
    } else {
      res.redirect('/admin/denied')
    }
  }
}

module.exports = utils
