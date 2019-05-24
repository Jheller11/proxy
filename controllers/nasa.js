const router = require('express').Router()
const { processNewRequest, saveRequest } = require('../utils')

// proxy for requests from nasa application
// github repo: https://github.com/Jheller11/nasa-images
// deployed application: https://nasa-image-search.surge.sh

// astronomy picture of the day
router.get('/apod', saveRequest, (req, res, next) => {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${
    process.env.NASA_APP_NASA_API_KEY
  }`
  processNewRequest(url, res, next)
})

// natural epic photo array (current date)
router.get('/epic/natural', saveRequest, (req, res, next) => {
  let url = 'https://epic.gsfc.nasa.gov/api/'
  processNewRequest(url + 'natural', res, next)
})

// enhanced epic photo array (current date)
router.get('/epic/enhanced', (req, res, next) => {
  let url = 'https://epic.gsfc.nasa.gov/api/'
  processNewRequest(url + 'enhanced', res, next)
})

// image/video search
router.post('/search', saveRequest, async (req, res, next) => {
  processNewRequest(req.body.url, res, next)
})

module.exports = router
