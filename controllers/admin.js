const router = require('express').Router()
const checkPassword = require('../utils').checkPassword

const projects = [
  {
    name: 'Weather',
    url: 'https://j-weather.surge.sh/',
    apis: [
      {
        name: 'OpenWeather',
        url: 'https://openweathermap.org/api'
      },
      {
        name: 'Google Maps',
        url:
          'https://developers.google.com/maps/documentation/javascript/tutorial'
      }
    ],
    access: '/weather',
    completed: false
  },
  {
    name: 'NASA Image Search',
    url: 'https://nasa-image-search.surge.sh/',
    apis: [
      {
        name: 'Astronomy Picture of the Day',
        url: 'https://api.nasa.gov/api.html#apod'
      },
      {
        name: 'EPIC',
        url: 'https://epic.gsfc.nasa.gov/about/api'
      },
      {
        name: 'NASA Image and Video Library',
        url: 'https://api.nasa.gov/api.html#Images'
      }
    ],
    access: '/nasa',
    completed: false
  }
]

// password protected route for viewing dashboard

// post route for recieving and verifying password

// home screen for API
router.get('/', (req, res, next) => {
  res.locals.title += ' - Home'
  res.render('home', { projects: projects })
})

module.exports = router
