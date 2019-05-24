const router = require('express').Router()
const { processNewRequest, saveRequest } = require('../utils')

// proxy for requests from weather application
// github repo: https://github.com/Jheller11/weather
// deployed application: https://j-weather.surge.sh

// Current weather information => requested by App.js
router.post('/current', saveRequest, async (req, res, next) => {
  let url = req.body.url + `&APPID=${process.env.WEATHER_APP_WEATHER_API_KEY}`
  processNewRequest(url, res, next)
})

// Forecast information => requested by ForecastContainer.js
router.post('/forecast', saveRequest, async (req, res, next) => {
  console.log('hit forecast')
  let url = req.body.url + `&APPID=${process.env.WEATHER_APP_WEATHER_API_KEY}`
  processNewRequest(url, res, next)
})

module.exports = router
