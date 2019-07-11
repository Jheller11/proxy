const router = require('express').Router()
const { saveHit } = require('../utils')
const Message = require('../models/Message')

// profile
router.get('/profile', saveHit, (req, res, next) => {
  res.status(200).send()
})

// POST ROUTE FOR NEW MESSAGE
// TODO -> Format message display
// TODO -> Add action buttons
// TODO -> routes for action buttons (delete, mark read)
// TODO -> SMS on new message received
router.post('/message', (req, res, next) => {
  Message.create(req.body)
    .then(message => res.status(200).send())
    .catch(err => res.send(err))
})

module.exports = router
