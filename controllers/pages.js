const router = require('express').Router()
const { saveHit } = require('../utils')

router.get('/profile', saveHit, (req, res, next) => {
  res.status(200).send()
})

router.get('/pyramids', saveHit, (req, res, next) => {
  res.status(200).send()
})

router.get('/rentcheck', saveHit, (req, res, next) => {
  res.status(200).send()
})

router.get('/liverpool', saveHit, (req, res, next) => {
  res.status(200).send()
})

module.exports = router
