const router = require('express').Router()
const axios = require('axios')

router.post('/', async (req, res, next) => {
  let data = () =>
    axios
      .get(req.body.url + `&APPID=${process.env.WEATHER_APP_WEATHER_API_KEY}`)
      .then(response => {
        return response.data
      })
      .catch(err => next(err))
  data().then(data => res.json(data))
})

module.exports = router
