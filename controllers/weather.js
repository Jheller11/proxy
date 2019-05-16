const router = require('express').Router()

router.get('/', (req, res, next) => {
  console.log(process.env.WEATHER_APP_WEATHER_API_KEY)
  res.json(process.env.WEATHER_APP_WEATHER_API_KEY).status(200)
})

module.exports = router
