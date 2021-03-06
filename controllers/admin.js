const router = require('express').Router()
const checkPassword = require('../utils').checkPassword
const Request = require('../models/Request')
const Message = require('../models/Message')

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
    completed: true
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
    completed: true
  }
]

const views = [
  { name: 'Portfolio', url: 'https://jheller11.github.io' },
  { name: 'Pyramids', url: 'https://jheller.github.io/pyramids' }
]

// restrict access direct to dashboard
router.get('/dashboard', (req, res, next) => {
  res.locals.title += ' - Home'
  res.render('home', {
    projects: projects,
    views: views,
    message:
      'Access to "/admin/dashboard" restricted. Please enter a valid password to continue.'
  })
})

// post route for recieving and verifying password
router.post('/dashboard', checkPassword, (req, res, next) => {
  Request.find({})
    .then(requests => {
      Message.find({})
        .then(messages => {
          res.locals.title += ' - Dashboard'
          res.render('dashboard', { requests: requests, messages: messages })
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

// invalid passcode
router.get('/denied', (req, res, next) => {
  res.locals.title += ' - Home'
  res.render('home', {
    projects: projects,
    views: views,
    message: 'Access code incorrect. Please try again.'
  })
})

// home screen for API
router.get('/', (req, res, next) => {
  res.locals.title += ' - Home'
  res.render('home', { projects: projects, views: views })
})

module.exports = router
