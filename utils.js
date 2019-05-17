const axios = require('axios')

const utils = {
  // receives full compiled url and res object from route/sends response
  // or passes any error to error handler
  processNewRequest: (url, res) => {
    axios
      .get(url)
      .then(response => {
        res.send(response.data)
      })
      .catch(err => console.log('Error in utils.processNewRequest', err))
  }
}

module.exports = utils
