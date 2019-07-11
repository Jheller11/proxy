const router = require('express').Router()
const { saveHit } = require('../utils')

// pyramids
router.get('/pyramids', saveHit, (req, res, next) => {
  res.status(200).send()
})

// rentcheck
router.get('/rentcheck', saveHit, (req, res, next) => {
  res.status(200).send()
})

// liverpool
router.get('/liverpool', saveHit, (req, res, next) => {
  res.status(200).send()
})

module.exports = router
