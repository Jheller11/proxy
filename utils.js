const axios = require('axios')
const Request = require('./models/Request')
const nodemailer = require('nodemailer')

const utils = {
  // receives full compiled url and res object from route/sends response
  // or passes any error to error handler
  processNewRequest: (url, res, next) => {
    axios
      .get(url)
      .then(response => {
        res.send(response.data)
      })
      .catch(err => next(err))
  },
  checkPassword: (req, res, next) => {
    if (req.body.password === process.env.ADMIN_PASSCODE) {
      next()
    } else {
      res.redirect('/admin/denied')
    }
  },
  saveRequest: (req, res, next) => {
    // body => req.body
    // method => req.originalMethod
    // path => req.originalUrl
    // application => req.baseUrl - leading /
    Request.create({
      body: req.body,
      method: req.originalMethod,
      path: req.originalUrl,
      application: req.baseUrl.slice(1)
    })
    next()
  },
  // for projects that don't require 3rd party data
  // only track page views
  saveHit: (req, res, next) => {
    Request.create({
      body: {},
      method: req.originalMethod,
      path: req.originalUrl,
      application: req.route.path.slice(1)
    })
    next()
  },
  // send email to text alerting me of new message
  sendNotification: message => {
    let transporter = nodemailer.createTransport({
      service: 'Yahoo',
      auth: {
        user: process.env.EMAIL_FROM_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    })
    let mailOptions = {
      from: process.env.EMAIL_FROM_ADDRESS,
      to: process.env.EMAIL_TO_ADDRESS,
      subject: `New Message from ${message.firstName} ${message.lastName}.`,
      text: message.message
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}

module.exports = utils
