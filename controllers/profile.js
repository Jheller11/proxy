const router = require('express').Router()
const { saveHit, sendNotification } = require('../utils')
const Message = require('../models/Message')

// profile
router.get('/profile', saveHit, (req, res, next) => {
  res.status(200).send()
})

// POST ROUTE FOR NEW MESSAGE
// TODO -> Add action buttons
// TODO -> routes for action buttons (delete, mark read)
router.post('/message', (req, res, next) => {
  Message.create(req.body)
    .then(message => {
      sendNotification(message)
      res.status(200).send()
    })
    .catch(err => res.send(err))
})

module.exports = router
