const router = require('express').Router()
const { saveHit } = require('../utils')
const Message = require('../models/Message')

// profile
router.get('/profile', saveHit, (req, res, next) => {
  res.status(200).send()
})

router.post('/message', (req, res, next) => {
  Message.create(req.body)
    .then(message => res.status(200).send())
    .catch(err => res.send(err))
})

module.exports = router
