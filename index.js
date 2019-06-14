// packages
const express = require('express')
const app = express()
const override = require('method-override')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const favicon = require('serve-favicon')

// config
app.use(bodyParser.urlencoded({ extended: true }))
app.use(override('_method'))
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'media', 'favicon.ico')))

// import controllers
const adminController = require('./controllers/admin')
const weatherController = require('./controllers/weather')
const nasaController = require('./controllers/nasa')
const pagesController = require('./controllers/pages')

// view engine (admin pages only)
app.set('views', './views')
app.set('view engine', 'pug')

// pass title and user to all views
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.title = 'JH Node Server'
  next()
})

// assign controllers
app.use('/admin', adminController)
app.use('/weather', weatherController)
app.use('/nasa', nasaController)
app.use('/pages', pagesController)

// home route
app.get('/', (req, res, next) => {
  res.redirect('/admin')
})

// error handler
app.use((error, req, res, next) => {
  if (error) {
    // if env == production => save error to db
    console.log(error)
    res.status(500)
    res.json({ error: error })
  }
  next()
})

// 404
app.use((req, res, next) => {
  res.status(404).render('404')
})

// set port
app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () =>
  console.log('server running on ' + app.get('port'))
)
