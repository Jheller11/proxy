// packages
const express = require('express')
const app = express()
const override = require('method-override')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
require('dotenv').config()

// config
app.use(bodyParser.urlencoded({ extended: true }))
app.use(override('_method'))
app.use(compression())
app.use(helmet())
app.use(cors())

// custom middleware
// TODO add function to log requests to server while in production mode.
// items to save => incoming req origin, data attached
// possibly add to error function => save req and whether successfully handled or error

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
  if (error) {
    // if env == production => save error to db
    res.status(500)
    res.json({ error: 'Error' })
  }
  next()
})
// set port
app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () =>
  console.log('server running on ' + app.get('port'))
)
