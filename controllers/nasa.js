const router = require('express').Router()
const processNewRequest = require('../utils').processNewRequest

router.get('/apod', (req, res, next) => {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${
    process.env.NASA_APP_NASA_API_KEY
  }`
  processNewRequest(url, res, next)
})

module.exports = router
