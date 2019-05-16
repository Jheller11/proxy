// packages
const express = require('express')
const app = express()
const override = require('method-override')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config()

// config
app.use(bodyParser.urlencoded({ extended: true }))
app.use(override('_method'))
app.use(compression())
app.use(helmet())

// import controllers
const weatherController = require('./controllers/weather')

// assign controllers
app.use('/weather', weatherController)

// home route
app.get('/', (req, res, next) => {
  res.send('Welcome to my server.').status(200)
})

// error handler
app.use((error, req, res, next) => {
  if (error) res.send(error)
  next()
})
// set port
app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () =>
  console.log('server running on ' + app.get('port'))
)
