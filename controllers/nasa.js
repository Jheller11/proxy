const router = require('express').Router()
const processNewRequest = require('../utils').processNewRequest

// proxy for requests from nasa application
// github repo: https://github.com/Jheller11/nasa-images
// deployed application: https://nasa-image-search.surge.sh

// astronomy picture of the day
router.get('/apod', (req, res, next) => {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${
    process.env.NASA_APP_NASA_API_KEY
  }`
  processNewRequest(url, res, next)
})

// natural epic photo array (current date)
router.get('/epic/natural', (req, res, next) => {
  let url = 'https://epic.gsfc.nasa.gov/api/'
  processNewRequest(url + 'natural', res, next)
})

// enhanced epic photo array (current date)
router.get('/epic/enhanced', (req, res, next) => {
  let url = 'https://epic.gsfc.nasa.gov/api/'
  processNewRequest(url + 'enhanced', res, next)
})

// image/video search
router.post('/search', async (req, res, next) => {
  let url = req.body.url
  processNewRequest(url, res, next)
})

module.exports = router
